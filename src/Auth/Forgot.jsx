import React, { useState } from 'react'
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { SeparatorHorizontal } from 'lucide-react'
import { LuSeparatorHorizontal } from 'react-icons/lu'

const Forgot = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')

  const handleSendOtp = () => {
    if (email) setStep(2)
  }

  const handleVerifyOtp = () => {
    if (otp.length === 6) onClose()
  }

  return (
    <div
      className={`w-full h-screen fixed top-0 left-0 right-0 bg-[rgba(0,0,0,.3)] flex items-center justify-center transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      onClick={onClose}
    >
      <div
        className={`w-full max-w-sm p-10 bg-white dark:bg-[#111] border rounded-xl shadow-lg transform transition-transform duration-300 ${isOpen ? 'translate-y-0' : 'translate-y-[500px]'}`}
        onClick={e => e.stopPropagation()}
      >
        {step === 1 && (
          <div className="flex flex-col space-y-4 relative items-center justify-center w-full">
            <span className='font-bold text-[20px] uppercase ' style={{lineHeight:'5px'}}>Forgot Password</span>
            <p className='uppercase text-sm pb-5'>Please enter your <span>email</span> to get <span>otp</span></p>
            <div className="flex relative w-full">
              <span className="text-sm bg-white dark:bg-[#111] px-2 uppercase font-semibold absolute top-[-10px] ml-2">Email Address</span>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="border border-gray-300 rounded-lg w-full px-3 py-2 focus:outline-none rounded-lg"
              />
            </div>
            <button
              onClick={handleSendOtp}
              className="text-white py-2 w-full rounded-lg h-12 font-bold uppercase cursor-pointer text-white bg-blue-700 transition"
              style={{
                color: 'white'
              }}
            >
              Send OTP
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col space-y-6 relative items-center">
            <InputOTP maxLength={6} value={otp} onChange={setOtp}>
              <InputOTPGroup className={'gap-1'}>
                <InputOTPSlot index={0} className={'w-[55px] h-[55px] rounded-[20px]'} />
                <LuSeparatorHorizontal />
                <InputOTPSlot index={1} className={'w-[55px] h-[55px] rounded-[20px]'} />
                  <LuSeparatorHorizontal />
                <InputOTPSlot index={2} className={'w-[55px] h-[55px] rounded-[20px]'} />
                  <LuSeparatorHorizontal />
                <InputOTPSlot index={3} className={'w-[55px] h-[55px] rounded-[20px]'} />
              </InputOTPGroup>
            </InputOTP>
            <button
              onClick={handleVerifyOtp}
              className="bg-green-600 text-white font-bold py-2 rounded w-full hover:bg-green-700 transition h-12 uppercase rounded-lg"
              style={{
                color: 'white'
              }}
            >
              Verify OTP
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Forgot
