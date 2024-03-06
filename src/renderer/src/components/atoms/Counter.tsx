import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import Button from './Button'

type CounterProps = {
  state: number
  setState: Dispatch<SetStateAction<number>>
}

export default function Counter({ state, setState }: CounterProps): JSX.Element {
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="flex items-center justify-center border-2">
          <Button onClick={(): void => setState(state - 1)} size={'icon'}>
            -
          </Button>
          <input
            type="number"
            value={state}
            onChange={(e: ChangeEvent<HTMLInputElement>): void =>
              setState(parseInt(e.target.value))
            }
            className="w-10 items-center justify-center text-center"
          />
          <Button onClick={(): void => setState(state + 1)} size={'icon'}>
            +
          </Button>
        </div>
      </div>
    </>
  )
}
