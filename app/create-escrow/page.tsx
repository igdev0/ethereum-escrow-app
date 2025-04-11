import "./style.css";
import Navbar from '@/app/components/navbar';

export default function CreateEscrow() {
  return (
      <div className="container mx-auto">
        <Navbar/>
        <form>
          <h1 className="text-4xl font-bold mb-4">Create new escrow contract </h1>
          <fieldset>
            <label htmlFor="arbiter">
              <span>Arbiter:</span>
              <input className="input" name="arbiter" placeholder="e.g: 0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097"/>
            </label>
          </fieldset>
          <fieldset>
            <label htmlFor="beneficiary">
              <span>Beneficiary:</span>
              <input className="input" name="beneficiary"
                     placeholder="e.g: 0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097"/>
            </label>
          </fieldset>
          <fieldset>
            <label htmlFor="amount">
              <span>Amount:</span>
              <input type="number" className="input" name="amount" placeholder="e.g: 0.1 (value in ETH)"/>
            </label>
          </fieldset>
          <button className="button">Submit</button>
        </form>
      </div>
  );
}