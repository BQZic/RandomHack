/**
 * donate function
 * @param {org.donationtracker.donate} donate
 * @transaction
 */
async function donate(donate){
  	let storage = donate.storage;
  	storage.item.push(donate.item);
	const storageRegistry = await getAssetRegistry('org.donationtracker.Storage');
  	await storageRegistry.update(donate.storage);
}