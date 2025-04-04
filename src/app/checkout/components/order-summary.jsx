import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

export function OrderSummary({
  items,
  subtotal,
  shipping,
  taxes,
  total,
  onApplyDiscount,
  onProceedToPay,
  onEnterShipping
}) {
  const [discountCode, setDiscountCode] = useState('');

  return (
    <div className='bg-card rounded-lg border p-6 shadow-sm'>
      <h2 className='mb-6 text-2xl font-bold'>Your Order</h2>

      {/* Order Items */}
      <div className='space-y-6'>
        {items.map((item) => (
          <div key={item.id} className='space-y-2'>
            <div className='flex justify-between'>
              <div>
                <h3 className='font-semibold'>{item.name}</h3>
                <p className='text-muted-foreground text-sm'>{item.variant}</p>
                {item.size && (
                  <Badge variant='outline' className='mt-1'>
                    Size: {item.size}
                  </Badge>
                )}
              </div>
              <p className='font-medium'>${item.price}</p>
            </div>
            <Separator />
          </div>
        ))}
      </div>

      {/* Discount Code */}
      <div className='my-6 flex gap-2'>
        <Input
          placeholder='Discount code'
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          className='flex-1'
        />
        <Button
          variant='outline'
          onClick={() => onApplyDiscount?.(discountCode)}
        >
          Apply
        </Button>
      </div>

      {/* Order Totals */}
      <div className='space-y-3'>
        <div className='flex justify-between'>
          <span className='text-muted-foreground'>
            Subtotal • {items.length} Items
          </span>
          <span>${subtotal}</span>
        </div>
        <div className='flex justify-between'>
          <span className='text-muted-foreground'>Shipping</span>
          <span className='text-green-600'>${shipping}</span>
        </div>
        <div className='flex justify-between'>
          <span className='text-muted-foreground'>GST and Taxes</span>
          <span>${taxes}</span>
        </div>
        <Separator className='my-2' />
        <div className='flex justify-between font-bold'>
          <span>Total</span>
          <span className='text-lg'>${total}</span>
        </div>
      </div>

      {/* Shipping Address */}
      <Button
        variant='outline'
        className='mt-6 w-full'
        onClick={onEnterShipping}
      >
        Enter shipping address
      </Button>

      {/* Payment Button */}
      <Button className='mt-4 w-full' onClick={onProceedToPay}>
        Proceed to Pay
      </Button>
    </div>
  );
}
