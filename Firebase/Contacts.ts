import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import { FIREBASE_DB as db, FIREBASE_AUTH } from './FirebaseConfig'
import { ChatData, Contact, Message, User } from './Types'
const auth = FIREBASE_AUTH

export const fetchContactsFirebase = async (
  setContacts: (contacts: Contact[]) => void
) => {
  const userDocRef = doc(db, 'users', auth.currentUser?.uid ?? '')
  const docSnap = await getDoc(userDocRef)
  if (docSnap.exists()) {
    const userData = docSnap.data()
    const contactsPromises = userData.contacts.map(
      async (contactUid: string) => {
        const contactDocRef = doc(db, 'users', contactUid)
        const contactDocSnap = await getDoc(contactDocRef)
        if (contactDocSnap.exists()) {
          return { uid: contactUid, ...contactDocSnap.data() } as Contact
        }
        return null
      }
    )
    const contactsDetails = await Promise.all(contactsPromises)
    setContacts(contactsDetails.filter(Boolean) as Contact[])
  }
}

export const handleAddContactFirebase = async (
  email: string,
  setEmail: (email: string) => void
) => {
  if (email) {
    try {
      const usersRef = collection(db, 'users')
      const q = query(usersRef, where('email', '==', email))
      const querySnapshot = await getDocs(q)

      if (!querySnapshot.empty) {
        const userToAdd = querySnapshot.docs[0]
        const userDocRef = doc(db, 'users', auth.currentUser?.uid ?? '')

        await updateDoc(userDocRef, {
          contacts: arrayUnion(userToAdd.id),
        })

        alert('Contact added successfully!')
        setEmail('')
      } else {
        alert('No user found with that email')
      }
    } catch (error) {
      console.error('Failed to add contact: ', error)
      alert('Failed to add contact')
    }
  } else {
    alert('Please enter a valid email address')
  }
}
