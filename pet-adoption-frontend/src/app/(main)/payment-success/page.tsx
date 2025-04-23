export default function PaymentSuccess({
    searchParams: { amount, },
}: { 
    searchParams: { amount: string }
}) {
    return (
        <div>
            <h3>{amount}</h3>
        </div>
    )
}