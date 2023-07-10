import * as spl from 'easy-spl';
import * as web3 from '@solana/web3.js';
const server = web3.clusterApiUrl('devnet');
const connection = new web3.Connection(server);

const newKeyPair = () => {
  return web3.Keypair.generate();
};

const transferToken = async (
  token: string,
  from: number[],
  to: string,
  amount: number,
) => {
  if (amount === 0) {
    return null;
  }

  const privateKey = new Uint8Array(from);
  const fromWallet = web3.Keypair.fromSecretKey(privateKey);
  const sender = spl.Wallet.fromKeypair(connection, fromWallet);
  return await sender.transferToken(
    new web3.PublicKey(token),
    new web3.PublicKey(to),
    amount,
  );
};

const getTokenBalance = async (wallet, publicKey: string) => {
  const sold = await wallet.getBalance(new web3.PublicKey(publicKey));
  return sold;
};

const getWallet = (privateKey: number[]) => {
  const privateKey_ = new Uint8Array(privateKey);
  const keyPair = web3.Keypair.fromSecretKey(privateKey_);
  return spl.Wallet.fromKeypair(connection, keyPair);
};

const sendLambor = async (f, to) => {
  const SECRET_KEY = new Uint8Array(f);
  const from = web3.Keypair.fromSecretKey(SECRET_KEY);

  const transaction = new web3.Transaction().add(
    web3.SystemProgram.transfer({
      fromPubkey: from.publicKey,
      toPubkey: to,
      lamports: 10000,
    }),
  );

  const signature = await web3.sendAndConfirmTransaction(
    connection,
    transaction,
    [from],
  );
  console.log('signature transfer lampor:', signature);
  return signature;
};

const getSolBalance = async (address) => {
  const json = {
    jsonrpc: '2.0',
    id: 1,
    method: 'getBalance',
    params: [address],
  };
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(json),
  };
  const res = await (await fetch(server, requestOptions)).json();
  return res.result.value;
};

export {
  server,
  newKeyPair,
  getWallet,
  transferToken,
  sendLambor,
  getSolBalance,
  getTokenBalance,
};
