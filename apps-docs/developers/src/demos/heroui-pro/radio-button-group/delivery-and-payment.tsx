// Adapted documented HeroUI Pro example; see ../README.md.
'use client'

import { NumberValue, RadioButtonGroup } from '@vezham/react-pro-v3'
import { Description, Label } from '@vezham/react-v3'

const deliveryOptions = [
  {
    description: '4-10 business days',
    price: 5,
    title: 'Standard',
    value: 'standard'
  },
  {
    description: '2-5 business days',
    price: 16,
    title: 'Express',
    value: 'express'
  },
  {
    description: '1 business day',
    price: 25,
    title: 'Super Fast',
    value: 'super-fast'
  }
]

const VisaIcon = () => (
  <svg fill="none" height={24} viewBox="0 0 512 512" width={24}>
    <path
      d="M253.509 175.921L219.303 335.84H177.929L212.138 175.921H253.509ZM427.568 279.182L449.343 219.13L461.874 279.182H427.568ZM473.744 335.84H512L478.578 175.921H443.29C435.337 175.921 428.632 180.532 425.665 187.643L363.587 335.84H407.037L415.662 311.957H468.734L473.744 335.84ZM365.742 283.632C365.921 241.426 307.397 239.088 307.789 220.23C307.915 214.5 313.382 208.397 325.331 206.836C331.255 206.073 347.603 205.454 366.134 213.993L373.381 180.068C363.429 176.467 350.62 173 334.683 173C293.783 173 265.012 194.725 264.782 225.859C264.519 248.883 285.334 261.72 300.984 269.388C317.119 277.226 322.525 282.251 322.446 289.254C322.335 299.983 309.58 304.734 297.704 304.914C276.892 305.238 264.828 299.289 255.214 294.807L247.704 329.866C257.387 334.297 275.227 338.153 293.7 338.351C337.183 338.351 365.612 316.881 365.742 283.632ZM194.391 175.921L127.357 335.84H83.6302L50.64 208.213C48.6401 200.365 46.8957 197.48 40.8134 194.164C30.8645 188.761 14.4413 183.708 0 180.564L0.978353 175.921H71.3758C80.3427 175.921 88.4104 181.888 90.4642 192.218L107.891 284.765L150.927 175.921H194.391Z"
      fill="#1434CB"
    />
  </svg>
)

const MasterCardIcon = () => (
  <svg fill="none" height={24} viewBox="0 0 512 512" width={24}>
    <path d="M325.228 131.82H186.781V380.612H325.228V131.82Z" fill="#FF5F00" />
    <path
      d="M195.571 256.225C195.549 232.264 200.978 208.613 211.448 187.061C221.919 165.509 237.155 146.622 256.003 131.829C232.662 113.482 204.629 102.072 175.11 98.9037C145.591 95.7353 115.776 100.936 89.0725 113.912C62.3692 126.887 39.8553 147.114 24.1041 172.28C8.35298 197.446 0 226.536 0 256.225C0 285.914 8.35298 315.004 24.1041 340.17C39.8553 365.336 62.3692 385.562 89.0725 398.538C115.776 411.513 145.591 416.714 175.11 413.546C204.629 410.378 232.662 398.968 256.003 380.621C237.155 365.828 221.919 346.941 211.449 325.389C200.979 303.837 195.549 280.185 195.571 256.225Z"
      fill="#EB001B"
    />
    <path
      d="M512 256.225C512.001 285.913 503.649 315.003 487.899 340.169C472.149 365.335 449.636 385.562 422.933 398.538C396.23 411.513 366.415 416.714 336.896 413.546C307.378 410.378 279.346 398.968 256.005 380.621C274.837 365.813 290.061 346.922 300.529 325.374C310.998 303.825 316.437 280.181 316.437 256.225C316.437 232.268 310.998 208.624 300.529 187.076C290.061 165.527 274.837 146.637 256.005 131.828C279.346 113.482 307.378 102.072 336.896 98.9036C366.415 95.7353 396.23 100.936 422.933 113.912C449.636 126.888 472.149 147.114 487.899 172.28C503.649 197.447 512.001 226.536 512 256.225Z"
      fill="#F79E1B"
    />
  </svg>
)

const PayPalIcon = () => (
  <svg fill="none" height={24} viewBox="0 0 512 512" width={24}>
    <path
      d="M408.637 142.891C397.131 129.412 376.672 123.46 350.083 123.46H260.174C254.392 123.46 249.476 127.669 248.576 133.381L212.244 363.482C211.563 367.767 214.876 371.622 219.206 371.622H280.674L278.073 387.998C277.481 391.74 280.387 395.126 284.167 395.126H336.714C341.808 395.126 346.136 391.422 346.934 386.37L347.359 383.987L357.037 322.764L357.569 319.659C358.367 314.607 362.695 310.903 367.789 310.903H374.177C418.416 310.903 453.186 293.399 462.543 241.128C466.436 219.172 464.262 200.829 453.115 187.885C449.909 184.127 445.956 180.957 441.21 178.269C431.286 163.052 414.459 149.722 408.637 142.891Z"
      fill="#179BD7"
    />
    <path
      d="M408.637 142.891C397.131 129.412 376.672 123.46 350.083 123.46H260.174C254.392 123.46 249.476 127.669 248.576 133.381L212.244 363.482C211.563 367.767 214.876 371.622 219.206 371.622H280.674L296.624 270.416V273.09C297.524 267.378 302.434 263.169 308.216 263.169H337.682C388.364 263.169 428.304 242.858 439.472 183.302C439.804 181.535 440.087 179.818 440.325 178.147L441.21 178.269C431.286 163.052 421.094 152.762 408.637 142.891Z"
      fill="#222D65"
    />
    <path
      d="M296.624 270.416C297.293 266.191 299.759 262.587 303.175 260.352C304.891 259.231 306.924 258.577 309.06 258.577H374.177C381.874 258.577 389.082 259.126 395.712 260.281C397.602 260.612 399.441 260.996 401.228 261.434C403.016 261.872 404.752 262.365 406.435 262.913C407.277 263.187 408.1 263.476 408.903 263.78C413.851 265.636 418.239 267.928 422.016 270.659C425.924 243.828 421.988 225.355 408.637 209.716C393.918 192.47 367.637 184.824 334.427 184.824H222.028C216.246 184.824 211.282 189.033 210.383 194.745L172.127 436.847C171.348 441.785 175.058 446.213 180.05 446.213H249.478L269.622 319.538L296.624 270.416Z"
      fill="#253B80"
    />
  </svg>
)

const paymentOptions = [
  {
    description: 'Exp. on 01/2026',
    icon: <VisaIcon />,
    title: '**** 0123',
    value: 'visa'
  },
  {
    description: 'Exp. on 06/2028',
    icon: <MasterCardIcon />,
    title: '**** 8304',
    value: 'mastercard'
  },
  {
    description: 'Pay with PayPal',
    icon: <PayPalIcon />,
    title: 'PayPal',
    value: 'paypal'
  }
]

export function DeliveryAndPayment() {
  return (
    <div className="flex w-full max-w-lg flex-col items-center gap-10">
      <section className="flex w-full flex-col gap-4">
        <RadioButtonGroup
          className="grid-cols-1 sm:grid-cols-3"
          defaultValue="express"
          layout="grid"
          name="delivery-full"
          variant="secondary">
          <Label className="col-span-full">Delivery method</Label>
          {deliveryOptions.map(option => (
            <RadioButtonGroup.Item key={option.value} value={option.value}>
              <RadioButtonGroup.Indicator />
              <RadioButtonGroup.ItemContent>
                <div className="flex flex-col gap-1">
                  <Label>{option.title}</Label>
                  <Description>{option.description}</Description>
                </div>
                <NumberValue
                  className="mt-2 text-sm font-semibold"
                  currency="USD"
                  style="currency"
                  value={option.price}
                />
              </RadioButtonGroup.ItemContent>
            </RadioButtonGroup.Item>
          ))}
        </RadioButtonGroup>
      </section>
      <section className="flex w-full flex-col gap-4">
        <RadioButtonGroup
          className="grid-cols-1 sm:grid-cols-2"
          defaultValue="visa"
          layout="grid"
          name="payment-full"
          variant="secondary">
          <Label className="col-span-full">Payment method</Label>
          {paymentOptions.map(option => (
            <RadioButtonGroup.Item key={option.value} value={option.value}>
              <RadioButtonGroup.ItemContent className="flex-row items-start gap-4">
                <RadioButtonGroup.ItemIcon>
                  {option.icon}
                </RadioButtonGroup.ItemIcon>
                <div className="flex flex-col gap-0.5">
                  <Label>{option.title}</Label>
                  <Description>{option.description}</Description>
                </div>
              </RadioButtonGroup.ItemContent>
            </RadioButtonGroup.Item>
          ))}
        </RadioButtonGroup>
      </section>
    </div>
  )
}
