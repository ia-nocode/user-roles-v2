import { useState, useEffect } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import type { User } from '../types/user';

export function useAdminAuth(firebaseUser: FirebaseUser | null | undefined) {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      setLoading(true);
      setIsAdmin(false);

      if (!firebaseUser) {
        setLoading(false);
        return;
      }

      try {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('uid', '==', firebaseUser.uid));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data() as User;
          setIsAdmin(userData.role === 'admin');
        }
      } catch (err) {
        console.error('Error checking admin status:', err);
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [firebaseUser]);

  return { isAdmin, loading };
}