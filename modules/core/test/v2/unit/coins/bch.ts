import 'should';
import * as Bluebird from 'bluebird';
const co = Bluebird.coroutine;

import { TestBitGo } from '../../../lib/test_bitgo';
import { TX_WITH_REPLAY_PROTECTION } from '../../fixtures/coins/bch';

describe('BCH:', function () {
  let bitgo;
  let tbch;

  before(function () {
    bitgo = new TestBitGo({ env: 'test' });
    bitgo.initializeTestVars();
    tbch = bitgo.coin('tbch');
  });

  describe('Should sign transaction', function () {
    it('should successfully sign a prebuilt transaction', async function () {
      const signedTransaction = await tbch.signTransaction({
        txPrebuild: {
          txHex: '010000000144dea5cb05425f94976e887ccba5686a9a12a3f49710b021508d3d9cd8de16b80100000000ffffffff02e803000000000000116a0f426974476f2070327368207465737440a107000000000017a914d039cb3344294a5a384a5508a006444c420cbc118700000000',
          txInfo: {
            unspents: [{
              address: '2NCEDmmKNNnqKvnWw7pE3RLzuFe5aHHVy1X',
              chain: 0,
              index: 13,
              value: 504422,
              txid: 'b816ded89c3d8d5021b01097f4a3129a6a68a5cb7c886e97945f4205cba5de44',
              redeemScript: '5221031cd227e40ad61b4e137109cb2845eb6f5a584ed5c67d9d3135cdaa5045a842ea2103a2e7b54c7b2da0992555353b8e26c6acff4248f4351f08787bf3e2efc94b658321025c2a6cde33c2d73ccf12eecf64c54f08f722c2f073824498950695e9883b141253ae',
            }],
          },
        },
        prv: 'xprv9s21ZrQH143K2fJ91S4BRsupcYrE6mmY96fcX5HkhoTrrwmwjd16Cn87cWinJjByrfpojjx7ezsJLx7TAKLT8m8hM5Kax9YcoxnBeJZ3t2k',
      });
      signedTransaction.txHex.should.equal('020000000144dea5cb05425f94976e887ccba5686a9a12a3f49710b021508d3d9cd8de16b801000000b7004830450221009e63ff1c8b0860073bc06bbce84f20568251a31f7a12c0ce300dc024e416f28202200b0dcb4a3b6b2cda1886ea6c020884907efd517d23d97e84fbf411aa65d280dd4100004c695221031cd227e40ad61b4e137109cb2845eb6f5a584ed5c67d9d3135cdaa5045a842ea2103a2e7b54c7b2da0992555353b8e26c6acff4248f4351f08787bf3e2efc94b658321025c2a6cde33c2d73ccf12eecf64c54f08f722c2f073824498950695e9883b141253aeffffffff02e803000000000000116a0f426974476f2070327368207465737440a107000000000017a914d039cb3344294a5a384a5508a006444c420cbc118700000000');
    });

    it('should fail to sign a prebuilt transaction with out a txPrebuild', co(function *() {
      const tbch = bitgo.coin('tbch');
      try {
        yield tbch.signTransaction({
          txAfterbuild: {
            txHex: '010000000144dea5cb05425f94976e887ccba5686a9a12a3f49710b021508d3d9cd8de16b80100000000ffffffff02e803000000000000116a0f426974476f2070327368207465737440a107000000000017a914d039cb3344294a5a384a5508a006444c420cbc118700000000',
            txInfo: {
              unspents: [{
                address: '2NCEDmmKNNnqKvnWw7pE3RLzuFe5aHHVy1X',
                chain: 0,
                index: 13,
                value: 504422,
                txid: 'b816ded89c3d8d5021b01097f4a3129a6a68a5cb7c886e97945f4205cba5de44',
                redeemScript: '5221031cd227e40ad61b4e137109cb2845eb6f5a584ed5c67d9d3135cdaa5045a842ea2103a2e7b54c7b2da0992555353b8e26c6acff4248f4351f08787bf3e2efc94b658321025c2a6cde33c2d73ccf12eecf64c54f08f722c2f073824498950695e9883b141253ae',
              }],
            },
          },
          walletPassphrase: 'xprv9s21ZrQH143K2fJ91S4BRsupcYrE6mmY96fcX5HkhoTrrwmwjd16Cn87cWinJjByrfpojjx7ezsJLx7TAKLT8m8hM5Kax9YcoxnBeJZ3t2k',
        });

        // it shouldn't be able to reach here, if it does cause the test to fail
        'word1'.should.equal('word2');
      } catch (e) {
        e.message.should.equal('missing txPrebuild parameter');
      }
    }));

    it('should fail to sign a prebuilt transaction with if the length of unspents does not match the number of inputs in the transaction', co(function *() {
      const tbch = bitgo.coin('tbch');
      try {
        yield tbch.signTransaction({
          txPrebuild: {
            txHex: '010000000144dea5cb05425f94976e887ccba5686a9a12a3f49710b021508d3d9cd8de16b80100000000ffffffff02e803000000000000116a0f426974476f2070327368207465737440a107000000000017a914d039cb3344294a5a384a5508a006444c420cbc118700000000',
            txInfo: {
              unspents: [{
                address: '2NCEDmmKNNnqKvnWw7pE3RLzuFe5aHHVy1X',
                chain: 0,
                index: 13,
                value: 504422,
                txid: 'b816ded89c3d8d5021b01097f4a3129a6a68a5cb7c886e97945f4205cba5de44',
                redeemScript: '5221031cd227e40ad61b4e137109cb2845eb6f5a584ed5c67d9d3135cdaa5045a842ea2103a2e7b54c7b2da0992555353b8e26c6acff4248f4351f08787bf3e2efc94b658321025c2a6cde33c2d73ccf12eecf64c54f08f722c2f073824498950695e9883b141253ae',
              },
              {
                address: '2NCEDmmKNNnqKvnWw7pE3RLzuFe5aHHVy1X',
                chain: 0,
                index: 13,
                value: 504422,
                txid: 'b816ded89c3d8d5021b01097f4a3129a6a68a5cb7c886e97945f4205cba5de44',
                redeemScript: '5221031cd227e40ad61b4e137109cb2845eb6f5a584ed5c67d9d3135cdaa5045a842ea2103a2e7b54c7b2da0992555353b8e26c6acff4248f4351f08787bf3e2efc94b658321025c2a6cde33c2d73ccf12eecf64c54f08f722c2f073824498950695e9883b141253ae',
              },
              ],
            },
          },
          walletPassphrase: 'xprv9s21ZrQH143K2fJ91S4BRsupcYrE6mmY96fcX5HkhoTrrwmwjd16Cn87cWinJjByrfpojjx7ezsJLx7TAKLT8m8hM5Kax9YcoxnBeJZ3t2k',
        });

        // it shouldn't be able to reach here, if it does cause the test to fail
        'word1'.should.equal('word2');
      } catch (e) {
        e.message.should.equal('length of unspents array should equal to the number of transaction inputs');
      }
    }));

    it('should fail to sign a prebuilt transaction with out passing in the prv', co(function *() {
      const tbch = bitgo.coin('tbch');
      try {
        yield tbch.signTransaction({
          txPrebuild: {
            txHex: '010000000144dea5cb05425f94976e887ccba5686a9a12a3f49710b021508d3d9cd8de16b80100000000ffffffff02e803000000000000116a0f426974476f2070327368207465737440a107000000000017a914d039cb3344294a5a384a5508a006444c420cbc118700000000',
            txInfo: {
              unspents: [{
                address: '2NCEDmmKNNnqKvnWw7pE3RLzuFe5aHHVy1X',
                chain: 0,
                index: 13,
                value: 504422,
                txid: 'b816ded89c3d8d5021b01097f4a3129a6a68a5cb7c886e97945f4205cba5de44',
                redeemScript: '5221031cd227e40ad61b4e137109cb2845eb6f5a584ed5c67d9d3135cdaa5045a842ea2103a2e7b54c7b2da0992555353b8e26c6acff4248f4351f08787bf3e2efc94b658321025c2a6cde33c2d73ccf12eecf64c54f08f722c2f073824498950695e9883b141253ae',
              }],
            },
          },
          walletPassphrase: 'not my private key',
        });

        // it shouldn't be able to reach here, if it does cause the test to fail
        'word1'.should.equal('word2');
      } catch (e) {
        e.message.should.equal('missing prv parameter to sign transaction');
      }
    }));

    it('should fail to sign if txPrebuild is not an object', co(function *() {
      const tbch = bitgo.coin('tbch');
      try {
        yield tbch.signTransaction({
          txPrebuild: '010000000144dea5cb05425f94976e887ccba5686a9a12a3f49710b021508d3d9cd8de16b80100000000ffffffff02e803000000000000116a0f426974476f2070327368207465737440a107000000000017a914d039cb3344294a5a384a5508a006444c420cbc118700000000',
          prv: 'xprv9s21ZrQH143K2fJ91S4BRsupcYrE6mmY96fcX5HkhoTrrwmwjd16Cn87cWinJjByrfpojjx7ezsJLx7TAKLT8m8hM5Kax9YcoxnBeJZ3t2k',
        });

        // it shouldn't be able to reach here, if it does cause the test to fail
        'word1'.should.equal('word2');
      } catch (e) {
        e.message.should.equal('txPrebuild must be an object, got type string');
      }
    }));

    it('should fail to sign if prv is not a string', co(function *() {
      const tbch = bitgo.coin('tbch');
      try {
        yield tbch.signTransaction({
          txPrebuild: {
            txHex: '010000000144dea5cb05425f94976e887ccba5686a9a12a3f49710b021508d3d9cd8de16b80100000000ffffffff02e803000000000000116a0f426974476f2070327368207465737440a107000000000017a914d039cb3344294a5a384a5508a006444c420cbc118700000000',
            txInfo: {
              unspents: [{
                address: '2NCEDmmKNNnqKvnWw7pE3RLzuFe5aHHVy1X',
                chain: 0,
                index: 13,
                value: 504422,
                txid: 'b816ded89c3d8d5021b01097f4a3129a6a68a5cb7c886e97945f4205cba5de44',
                redeemScript: '5221031cd227e40ad61b4e137109cb2845eb6f5a584ed5c67d9d3135cdaa5045a842ea2103a2e7b54c7b2da0992555353b8e26c6acff4248f4351f08787bf3e2efc94b658321025c2a6cde33c2d73ccf12eecf64c54f08f722c2f073824498950695e9883b141253ae',
              }],
            },
          },
          prv: ['xprv9s21ZrQH143K2fJ91S4BRsupcYrE6mmY96fcX5HkhoTrrwmwjd16Cn87cWinJjByrfpojjx7ezsJLx7TAKLT8m8hM5Kax9YcoxnBeJZ3t2k'],
        });

        // it shouldn't be able to reach here, if it does cause the test to fail
        'word1'.should.equal('word2');
      } catch (e) {
        e.message.should.equal('prv must be a string, got type object');
      }
    }));

    it('should fail to sign a prebuilt transaction with only a public key', co(function *() {
      const tbch = bitgo.coin('tbch');

      yield tbch.signTransaction({
        txPrebuild: {
          txHex: '010000000144dea5cb05425f94976e887ccba5686a9a12a3f49710b021508d3d9cd8de16b80100000000ffffffff02e803000000000000116a0f426974476f2070327368207465737440a107000000000017a914d039cb3344294a5a384a5508a006444c420cbc118700000000',
          txInfo: {
            unspents: [{
              address: '2NCEDmmKNNnqKvnWw7pE3RLzuFe5aHHVy1X',
              chain: 0,
              index: 13,
              value: 504422,
              txid: 'b816ded89c3d8d5021b01097f4a3129a6a68a5cb7c886e97945f4205cba5de44',
              redeemScript: '5221031cd227e40ad61b4e137109cb2845eb6f5a584ed5c67d9d3135cdaa5045a842ea2103a2e7b54c7b2da0992555353b8e26c6acff4248f4351f08787bf3e2efc94b658321025c2a6cde33c2d73ccf12eecf64c54f08f722c2f073824498950695e9883b141253ae',
            }],
          },
        },
        prv: 'xpub661MyMwAqRbcGpyL5QvWah4XZYHuTK21mSQ4NVwYaX67A35Kzb42nmTdf2WArW4tettXrWpfpwFbEFdEVqcSvnHLB8F6p1D41ssmbnRMXpc',
      }).should.be.rejectedWith('expected user private key but received public key');
    }));
  });

  describe('Explain Transaction:', () => {
    it('should successfully explain a transaction that includes a single sig p2sh replay protection input', async function () {
      const tbch = bitgo.coin('tbch');

      const explanation = await tbch.explainTransaction({
        txHex: TX_WITH_REPLAY_PROTECTION,
      });

      explanation.should.have.property('signatures', 0);
    });
  });
});
