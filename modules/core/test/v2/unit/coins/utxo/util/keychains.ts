/**
 * @prettier
 */
import * as bip32 from 'bip32';
import { WalletUnspentSigner } from '../../../../../../src/v2/coins/utxo/sign';
import { Triple } from '../../../../../../src';

export type KeychainBase58 = {
  pub: string;
  prv: string;
};

export const keychainsBase58: Triple<KeychainBase58> = [
  {
    pub: 'xpub661MyMwAqRbcGiQhVk1J7cD1YodF9tc5Y1B8vpTjjB1pcB1J1m1QX8fMtYP2sYqFmW6J2ra69tNoARKjvTGo9cGUrbPbJdjwrSzGGzPzWWS',
    prv: 'xprv9s21ZrQH143K4ELEPiUHkUGGzmnkkRtEAnFY8S48AqUqjNg9UDh9yLLt3FcfATyCjbsMB9JCGHAD8MeBTAK1P7trFppkoswu5ZAsHYASfbk',
  },
  {
    pub: 'xpub661MyMwAqRbcFzLXuganogQvd7MrefQQqCcJP2ZDumnCdQecf5cw1P1nD5qBz8SNS1yCLSC9VqpNUWnQU3V6qmnPt2r21oXhicQFzPA6Lby',
    prv: 'xprv9s21ZrQH143K3WG4of3nSYUC55XNFCgZTyghae9cMSFDkcKU7YJgTahJMpdTY9CjCcjgSo2TJ635uUVx176BufUMBFpieKYVJD9J3VvrGRm',
  },
  {
    pub: 'xpub661MyMwAqRbcFHpwWrzPB61U2CgBmdD21WNVM1JKUn9rEExkoGE4yafUVFbPSd78vdX8tWcEUQWaALFkU9fUbUM4Cc49DKEJSCYGRnbzCym',
    prv: 'xprv9s21ZrQH143K2okUQqTNox4jUAqhNAVAeHStYcthvScsMSdcFiupRnLzdxzfJithak5Zs92FQJeeJ9Jiya63KfUNxawuMZDCp2cGT9cdMKs',
  },
];

export const keychains: Triple<bip32.BIP32Interface> = keychainsBase58.map(({ pub, prv }) => {
  const k = bip32.fromBase58(prv);
  if (k.neutered().toBase58() !== pub) {
    throw new Error(`mismatch`);
  }
  return k;
}) as Triple<bip32.BIP32Interface>;

function getWalletUnspentSignerUserBitGo(): WalletUnspentSigner {
  return new WalletUnspentSigner(keychains, keychains[0], keychains[2]);
}

export function getDefaultWalletUnspentSigner(): WalletUnspentSigner {
  return getWalletUnspentSignerUserBitGo();
}