import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

/*  Part I
	Input: array of Users
	Output: array of email addresses (i.e. array of strings)
 */

function validateWalletItems(data: any): string[] {
	const validation: string[] = [];
	//Write your code here
	data.forEach((user: any, index: number) => {
		let userBalance = user.userWallet ? user.userWallet.walletBalance : 0;
		let userWalletItemTotal = 0;
		if(user.userWalletItem){
			user.userWalletItem.forEach((userWalletItem: any) => {
				if(userWalletItem.type === "credit"){
					userWalletItemTotal += userWalletItem.amount;
				}
				else{
					userWalletItemTotal -= userWalletItem.amount;
				}
			})
		}
		if(userBalance !== userWalletItemTotal){
			validation.push(user.email)
		}
	})
	return validation;
}

/*  Part II
	Input: array of Users
	Output: total admin cash given out in dollars (i.e. number)
 */
function calculateAdminCash(data: any): number {
	const totalAmount: number = 0;
	//Write your code here
	return totalAmount;
}

/*  Part III
	Complete the query that is used here:
	await prisma.user.findMany(query1);
 */
const query1 = {
	//Write your code here
}

/*  Part IV
	Complete the query that is used here:
	await prisma.user.update(query2);
 */
const query2 = {
	//Write your code here
}

/***********************************
 * DO NOT MODIFY ANY CODE BELOW HERE
 ***********************************/
const user1 = {
    data: {
		businessName: 'ABC Logistics',
		email: 'rishi@ABC.com',
		ownerName: 'rishi jain',
		classification: 'logistics company',
		active: false,
		userWallet: {
			create: {
				walletBalance: 2000, //stored in cents
			}
		},
		userWalletItem: 
		{
			create: [
				{
				type: 'credit',
				amount: 2000,
				description: 'adminCash',
				}
			]
		},
    },
};

const user2 = {
    data: {
		businessName: 'Moving Company',
		email: 'alex@movingcompany.com',
		ownerName: 'Alex Kroney',
		classification: 'last mile logistics',
		active: true,
		userWallet: {
			create: {
				walletBalance: 2500,
			}
		},
		userWalletItem: 
		{
			create: [
				{
				type: 'credit',
				amount: 2500, 
				description: 'adminCash',
				},
				{
				type: 'debit',
				amount: 2200, 
				description: '', //when type = 'debit', description is empty
				},
				{
				type: 'credit',
				amount: 2200, 
				description: 'cash', 
				}
			]
		},
    },
};

async function main() {
	/* The following was originally used to create the 2 users
	await prisma.user.create(user1);
	await prisma.user.create(user2);
	*/
	const users = await prisma.user.findMany({
		include: {
      		userWallet: true,
      		userWalletItem: true,
    	},
	})
	validateWalletItems(users);
	calculateAdminCash(users);
	// const queried = await prisma.user.findMany(query1);
	// console.log(queried);
	// const updated = await prisma.user.update(query2);
	// console.log(updated);
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
