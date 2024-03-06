import Button from '../components/atoms/Button'
import Counter from '../components/atoms/Counter'
import { useGlobalContext } from '../hooks/useGlobalContext'
import { useEffect, useState } from 'react'

type OrderingProps = {
  selectedTable: number | undefined
}

export default function Ordering({ selectedTable }: OrderingProps): JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(undefined)
  const [count, setCount] = useState<number>(1)
  const [order_id, setOrderId] = useState<number | undefined>(undefined)

  const { orderResources, orders, fetchOrders, fetchOrderResources } = useGlobalContext()

  useEffect(() => {
    ;(async (): Promise<void> => {
      if (!orders.find((order) => order.table_id === selectedTable && !order.payed)) {
        if (selectedTable) {
          await window.orderApi.createOrder(selectedTable)
          setOrderId
        }
        fetchOrders()
      } else {
        const foundOrder = orders.find((order) => order.table_id === selectedTable && !order.payed)
        if (foundOrder) setOrderId(foundOrder.id)
      }
    })()
  }, [orders])

  const saveOrder = (resourceId: number): void => {
    const foundOrderResource = orderResources.find(
      (orderResource) =>
        orderResource.order_id === order_id && orderResource.resource_id === resourceId
    )
    if (!foundOrderResource) {
      if (order_id) window.orderResourceApi.createOrderResource(order_id, resourceId, 1 * count)
    } else {
      if (order_id && foundOrderResource.amount)
        window.orderResourceApi.updateOrderResource(
          order_id,
          resourceId,
          1 * count + foundOrderResource.amount
        )
    }
    setCount(1)
    fetchOrderResources()
  }

  const { categories, resources } = useGlobalContext()
  return (
    <>
      <div className="flex mt-10">
        <div className="w-1/5 grid grid-cols-1">
          {categories.map((category) => (
            <Button
              onClick={(): void => setSelectedCategory(category.id)}
              key={category.id}
              size={'rectangle'}
              className="bg-blue-200 hover:bg-blue-300"
            >
              {category.category_name}
            </Button>
          ))}
        </div>
        <div className="w-4/5 ml-10">
          <div className="pb-10">
            <Counter state={count} setState={setCount} />
          </div>
          <div className="flex flex-wrap">
            <ul className="flex flex-wrap">
              {resources
                .filter((resource) => resource.category_id === selectedCategory)
                .map((filteredResource) => (
                  <li key={filteredResource.id}>
                    <Button
                      key={filteredResource.id}
                      onClick={(): void => saveOrder(filteredResource.id)}
                      size={'rectangle'}
                    >
                      {filteredResource.name}
                    </Button>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
