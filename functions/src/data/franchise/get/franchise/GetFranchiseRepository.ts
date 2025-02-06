import { database } from '@data/firebase';

export async function GetFranchiseRepository(): Promise<string[]> {
  try {
    let franchises = []
    const franchisesSnapshot = await database.collection('franchises').get();
    if (franchisesSnapshot.empty) {
      console.log("No franchises.");
      return [];
    }
    for (const doc of franchisesSnapshot.docs) {
      const data = doc.id;
      // console.log("GetFranchiseRepository data: ", JSON.stringify(data));
      franchises.push(data.toLowerCase())
    }
    // console.log("GetFranchiseRepository franchises: ", franchises)
    return franchises
  } catch (error) {
    console.error('Error fetching franchises data:', error);
    throw error;
  }
}


