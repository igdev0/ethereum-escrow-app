"use client";
import "./style.css";
import Navbar from '@/app/components/navbar';
import {useFormStatus} from 'react-dom';
import useWallet from '@/app/hooks/use-wallet';
import {ethers} from 'ethers';
import {abi, bytecode} from '../generated/contracts/Escrow.sol/Escrow.json';
import {useState} from 'react';
import {storeEscrowContract} from '@/app/actions';

export default function CreateEscrow() {
  const status = useFormStatus();
  const {provider, address} = useWallet();
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = async (form: FormData) => {
    const signer = await provider?.getSigner();
    const amount = form.get('amount');
    const arbiter = form.get("arbiter");
    const beneficiary = form.get("beneficiary");

    if (!amount) {
      return setError('The amount field is required');
    } else if (!beneficiary) {
      return setError('The beneficiary field is required');
    } else if (!arbiter) {
      return setError('The arbiter field is required');
    } else if (arbiter === beneficiary) {
      return setError("The beneficiary cannot be the same as arbiter");
    } else if (arbiter === address) {
      return setError("The arbiter cannot be the same as depositor");
    } else if (beneficiary === address) {
      return setError("The beneficiary cannot be the same as depositor");
    }

    if (signer && provider) {
      try {
        const contractFactory = new ethers.ContractFactory(abi, bytecode);
        const contractDeployTransaction = await contractFactory.getDeployTransaction(arbiter, beneficiary, {value: ethers.parseUnits(amount!.toString(), 'ether')});
        const populatedTx = await signer.populateTransaction(contractDeployTransaction);
        const tx = await signer.sendTransaction(populatedTx);
        const receipt = await tx.wait();

        await storeEscrowContract({
          arbiter: arbiter!.toString(),
          address: receipt!.contractAddress??"",
          depositor: signer.address,
          beneficiary: beneficiary.toString(),
          isMinted: false,
          isApproved: false,
        });

        setError(null);
      } catch (err) {
        setError((err as Error).message);
        console.error(err);
      }
    }
  };
  return (
      <div className="container mx-auto">
        <Navbar/>
        <form action={handleSubmit}>
          <h1 className="text-4xl font-bold mb-4">Create new escrow contract </h1>
          <fieldset>
            <label htmlFor="arbiter">
              <span>Arbiter:</span>
              <input className="input" name="arbiter" placeholder="e.g: 0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097"
                     defaultValue="0xdD2FD4581271e230360230F9337D5c0430Bf44C0"/>
            </label>
          </fieldset>
          <fieldset>
            <label htmlFor="beneficiary">
              <span>Beneficiary:</span>
              <input className="input" name="beneficiary"
                     placeholder="e.g: 0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097"
                     defaultValue="0xf31245fE30C2B0fA8c5C63d0a183BA179f7Ad172"/>
            </label>
          </fieldset>
          <fieldset>
            <label htmlFor="amount">
              <span>Amount:</span>
              <input type="number" className="input" name="amount" placeholder="e.g: 0.1 (value in ETH)"
                     defaultValue="1"/>
            </label>
          </fieldset>
          {
              error && (
                  <fieldset>
                    <span className="text-red-500 font-bold">{error}</span>
                  </fieldset>
              )
          }
          <button className="button" disabled={status.pending}>Submit</button>
        </form>
      </div>
  );
}