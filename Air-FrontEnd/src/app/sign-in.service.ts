import { Injectable } from '@angular/core';
import { ethers, hashMessage } from 'ethers';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  provider?: ethers.BrowserProvider;
  signer?: ethers.Signer;
  isSignedIn = false;
  currentUserAddress: string = '';  // Store the user's Ethereum address globally within the service

  constructor() {}

  async connectToWallet() {
    if ((window as any).ethereum) {
      this.provider = new ethers.BrowserProvider((window as any).ethereum);
      this.signer = await this.provider.getSigner();
      console.log('Wallet connected');
    }
  }

  async validateCredentials() {
    if (this.signer) {
      const address = await this.signer.getAddress();
      this.currentUserAddress = address;  // Store the address for later use
      const message = `Sign-in attempt for ${address}`;
      try {
        const signature = await this.signer.signMessage(message);
        const verifiedAddress = ethers.recoverAddress(hashMessage(message), signature);
        
        if (verifiedAddress === address) {
          // Send the verified address to the backend for role check
          fetch('http://localhost:3000/api/auth/verifyAdmin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ethAddress: verifiedAddress })
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            if (data.isAdmin) {
              console.log('User is an administrator.');
              this.isSignedIn = true;
            } else {
              console.log('User is not an administrator.');
            }
          })
          .catch(error => {
            console.error('Error verifying admin status:', error);
          });
        }
      } catch (error) {
        console.error("Error signing in:", error);
      }
    } else {
      console.log('No signer available');
    }
  }

  // Not yet working. still needs to be done
  // fetchUserName(address: string): void {
  //   console.log(`Fetching user info for address: ${address}`);
  //   fetch('http://localhost:3000/api/users/find', {
  //     method: 'POST',
  //     headers: {'Content-Type': 'application/json'},
  //     body: JSON.stringify({ ethAddress: address })
  //   })
  //   .then(response => {
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
  //     return response.json();
  //   })
  //   .then(data => {
  //     if (data && data.firstName) {
  //       this.userName = data.firstName;
  //       console.log(`User name fetched: ${this.userName}`);
  //     } else {
  //       this.userName = 'Unknown User';
  //       console.log('User not found or missing firstName');
  //     }
  //   })
  //   .catch(error => {
  //     console.error('Error fetching user name:', error);
  //     this.userName = 'Error Fetching User';
  //   });
  // }
}




// The code below is supposed to be for the Authentication but i keep getting the same error that i couldnt figure out how to fix.



// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { ethers, hashMessage } from 'ethers';

// @Injectable({
//   providedIn: 'root',
// })
// export class SignInService {
//   provider?: ethers.BrowserProvider;
//   signer?: ethers.Signer;
//   isSignedIn = false;

//   constructor(private http: HttpClient) {
//     if (!http) {
//       console.error('HttpClient not available!');
//     } else {
//       console.log('HttpClient is available.');
//     }
//   }

//   async connectToWallet() {
//     if ((window as any).ethereum) {
//       this.provider = new ethers.BrowserProvider((window as any).ethereum);
//       this.signer = await this.provider.getSigner();
//     }
//   }

//   async validateCredentials() {
//     if (this.signer) {
//       const address = await this.signer.getAddress();
//       const message = `Sign-in attempt for ${address}`;
//       try {
//         const signature = await this.signer.signMessage(message);
//         const verifiedAddress = ethers.recoverAddress(hashMessage(message), signature);
        
//         if (verifiedAddress === address) {
//           // Send the verified address to the backend for role check
//           this.http.post<{ isAdmin: boolean }>('/api/auth/verifyAdmin', { ethAddress: verifiedAddress })
//             .subscribe(response => {
//               if (response.isAdmin) {
//                 console.log('User is an administrator.');
//                 this.isSignedIn = true;
//               } else {
//                 console.log('User is not an administrator.');
//               }
//             });
//         }
//       } catch (error) {
//         console.error("Error signing in:", error);
//       }
//     }
//   }
// }
