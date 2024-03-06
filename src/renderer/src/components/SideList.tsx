import { useGlobalContext } from '../hooks/useGlobalContext'
import { IOrder, IOrderResource, IResource } from '../interfaces/interfaces'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Button from './atoms/Button'
import { useLocation, useNavigate } from 'react-router-dom'
import Counter from './atoms/Counter'

type SideListProps = {
  selectedTable: number | undefined
  setSelectedTable: Dispatch<SetStateAction<number | undefined>>
}

export default function SideList({ selectedTable, setSelectedTable }: SideListProps): JSX.Element {
  const { orderResources, orders, resources, fetchResources, fetchOrders } = useGlobalContext()
  const [filteredOrderResources, setFilteredOrderResources] = useState<IOrderResource[]>([])
  const [discount, setDiscount] = useState<number>(0)

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const filtered = orderResources.filter(
      (orderResource) =>
        orders.find((order) => order.table_id === selectedTable && order.payed === null)?.id ===
        orderResource.order_id
    )
    setFilteredOrderResources(filtered)
  }, [orderResources, selectedTable])

  const findResource = (resourceId: number): IResource | undefined => {
    return resources.find((resource) => resource.id === resourceId)
  }

  const findOrder = (): IOrder | undefined => {
    return orders.find((order) => order.table_id === selectedTable && !order.payed)
  }

  const handleDeleteOrderResource = async (
    resource_id: number,
    order_id: number
  ): Promise<void> => {
    await window.orderResourceApi.deleteOrderResource(order_id, resource_id)
  }

  const handlePayment = async (): Promise<void> => {
    const foundOrder = findOrder()
    if (foundOrder && selectedTable)
      await window.orderApi.updateOrder(foundOrder.id, selectedTable, discount, new Date())
    const foundOrderResources = orderResources.filter(
      (orderResource) => orderResource.order_id === findOrder()?.id
    )

    for (let i = 0; i < foundOrderResources.length; i++) {
      const r = findResource(foundOrderResources[i].resource_id)
      const amount = foundOrderResources[i].amount
      if (r && r.amount !== undefined && amount !== undefined) {
        await window.resourceApi.updateResource(
          r.id,
          r.name,
          r.category_id,
          r.price,
          (r.amount || 0) - amount
        )
      }
    }

    fetchOrders()
    fetchResources()
    setSelectedTable(undefined)
    navigate('/')
  }

  const summaryOfResources = (): number => {
    let sum = 0
    orderResources.map((orderResource) => {
      if (orderResource.order_id === findOrder()?.id) {
        const r = findResource(orderResource.resource_id)
        if (r?.price && orderResource.amount) sum = sum + r?.price * orderResource.amount
      }
    })
    return sum
  }

  const findResourcePrice = (resourceId): number | undefined => {
    const resource = resources.find((resource) => resourceId === resource.id)?.price
    if (resource) return resource
    return undefined
  }

  return (
    <>
      <div className="mr-5">
        <div className="mb-10">
          {location.pathname !== '/:tableId/table' ? (
            <Button
              variant={'peurple'}
              disabled={selectedTable ? false : true}
              onClick={(): void => navigate('/:tableId/table')}
            >
              Szerkeszt
            </Button>
          ) : null}
          <Button variant={'red'} onClick={handlePayment} disabled={selectedTable ? false : true}>
            Fizet
          </Button>
        </div>
        <div>{selectedTable ? null : <div>Nincs kijelölt asztal</div>}</div>
        {selectedTable ? (
          <>
            <div className="pb-10">
              <h2 className="text-center">Kedvezmény:</h2>
              <Counter state={discount} setState={setDiscount} />
            </div>
          </>
        ) : null}
        <ul>
          {filteredOrderResources.map((orderResource, index) => (
            <li
              className="border-b-2"
              key={index}
              onClick={(): Promise<void> =>
                handleDeleteOrderResource(orderResource.resource_id, orderResource.order_id)
              }
            >
              <div className="text-xl font-bold">
                {resources.find((resource) => orderResource.resource_id === resource.id)?.name}
              </div>
              <div className="flex flex-wrap">
                <div>
                  {resources.find((resource) => orderResource.resource_id === resource.id)?.price} x
                  {orderResource.amount}
                </div>
                <div className="ml-auto">
                  {((): JSX.Element => {
                    const resourcePrice = findResourcePrice(orderResource.resource_id)
                    if (resourcePrice && orderResource.amount) {
                      const totalPrice = resourcePrice * orderResource.amount
                      return <>{totalPrice} Ft</>
                    }
                    return <></>
                  })()}
                </div>
              </div>
            </li>
          ))}
        </ul>
        {selectedTable ? (
          <div className="pt-10">
            <div>
              <div className="text-lg">Összesen:</div>
              <div className="text-lg font-bold">{summaryOfResources()} Ft</div>
            </div>
            <div className="pt-5">
              <div className="text-lg">Kedvezményes összeg:</div>
              <div className="text-2xl font-bold">
                {summaryOfResources() * ((100 - discount) / 100)} Ft
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  )
}
