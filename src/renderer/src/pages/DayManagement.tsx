import Button from '../components/atoms/Button'
import { useGlobalContext } from '../hooks/useGlobalContext'
import { IDay, IOrderResource, IResource } from '../interfaces/interfaces'

export default function DayManagement(): JSX.Element {
  const { days, fetchDays, orderResources, resources, orders } = useGlobalContext()

  const findResource = (resourceId: number): IResource | undefined => {
    return resources.find((resource) => resource.id === resourceId)
  }

  const findOrderResources = (orderId: number): IOrderResource[] | undefined => {
    return orderResources.filter((orderResource) => orderResource.order_id === orderId)
  }

  const findOpenedDay = (): IDay | undefined => {
    const day = days.find((day) => day.open && !day.close)
    if (day) return day
    return undefined
  }

  const summaryOfResources = (): number => {
    let sum = 0
    const openDay = findOpenedDay()
    orders.forEach((order) => {
      if (openDay && order.payed > openDay.open) {
        const foundOrderResource = findOrderResources(order.id)
        foundOrderResource?.map((foundOrderResource) => {
          const r = findResource(foundOrderResource.resource_id)
          if (r?.price && foundOrderResource.amount)
            sum = sum + (r?.price * foundOrderResource.amount * (100 - order.discount_value)) / 100
        })
      }
    })
    return sum
  }

  const now: Date = new Date()

  const handleDayOpen = async (): Promise<void> => {
    await window.dayApi.createDay(now)
    fetchDays()
  }

  const handleDayClose = async (): Promise<void> => {
    const openDay = findOpenedDay()
    if (openDay) await window.dayApi.updateDay(openDay.id, openDay.open, now, summaryOfResources())
    fetchDays()
    alert('Nap lezárva!')
  }

  const formatDate = (timestamp: Date): string => {
    const date = new Date(timestamp)
    return date.toLocaleString()
  }

  return (
    <>
      <div className="m-5">
        <div>
          <Button variant={'blue'} onClick={handleDayOpen}>
            Nap nyitása
          </Button>
          <Button variant={'red'} onClick={handleDayClose}>
            Nap zárása
          </Button>
        </div>
        <div className="mt-10">
          <h2>Korábbi napok:</h2>
          <ul className="w-full table">
            <li>
              <span className="table-cell min-w-[200px] text-center border-b-2 text-lg">
                Nyitás
              </span>
              <span className="table-cell min-w-[200px] text-center border-b-2 text-lg">Zárás</span>
              <span className="table-cell min-w-[200px] text-center border-b-2 text-lg">
                Napi forgalom
              </span>
            </li>
            {days.map((day) => (
              <li key={day.id}>
                <span className="table-cell min-w-[200px] text-center border-b-2">
                  {formatDate(day.open)}
                </span>
                <span className="table-cell min-w-[200px] text-center border-b-2">
                  {day.close ? formatDate(day.close) : null}
                </span>
                <span className="table-cell min-w-[200px] text-center border-b-2">
                  {day.summary ? day.summary + ' Ft' : null}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
