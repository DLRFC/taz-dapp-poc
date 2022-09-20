import { useEffect, useState } from 'react'

const footerMessages = [
  'who am I?',
  'incognito mode 4eva',
  'making your identity safu',
  'enter anon mode',
  'your identity is burnt',
  'private since [REDACTED]',
  'thanks for looking at our work :)'
]

const Footer = () => {
  const [message, setMessage] = useState(footerMessages[0])
  const randomMessage = footerMessages[Math.floor(Math.random() * footerMessages.length)]

  useEffect(() => setMessage(randomMessage), [])

  return (
    <div className="relative flex items-center flex-col bg-black text-brand-2xs text-brand-beige">
      <p className="py-10">
        &#8220;{message}&#8221;&nbsp;&ndash;&nbsp;
        <a href="" className="underline mt-3">
          @PrivacyScaling
        </a>
      </p>
    </div>
  )
}

export default Footer
