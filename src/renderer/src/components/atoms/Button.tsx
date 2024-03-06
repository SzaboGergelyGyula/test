import { VariantProps, cva } from 'class-variance-authority'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export const buttonStyles = cva(['transition-colors'], {
  variants: {
    variant: {
      default: [],
      blue: ['bg-blue-500 hover:bg-blue-700 text-white'],
      red: ['bg-red-500 hover:bg-red-700 text-white'],
      peurple: ['bg-purple-500 hover:bg-purple-700, text-white']
    },
    size: {
      default: ['w-40 h-10 rounded-full'],
      rectangle: ['w-52 h-14 border-2 hover:bg-gray-200'],
      icon: ['w-8 h-8 hover:bg-gray-200 rounded-full']
    }
  },

  defaultVariants: {
    variant: 'default',
    size: 'default'
  }
})

type ButtonProps = VariantProps<typeof buttonStyles> & ComponentProps<'button'>

export default function Button({ variant, size, className, ...props }: ButtonProps): JSX.Element {
  return (
    <button
      {...props}
      className={twMerge(buttonStyles({ variant, size }), [
        className,
        ' px-2 py-1 m-2 items-center justify-center text-center'
      ])}
    />
  )
}
