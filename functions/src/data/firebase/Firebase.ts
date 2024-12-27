import { initializeApp } from "firebase-admin/app"
import { firestore } from "firebase-admin"
import { getStorage } from "firebase-admin/storage"

initializeApp()

export const database = firestore()
export const storage = getStorage()
export { File } from '@google-cloud/storage'