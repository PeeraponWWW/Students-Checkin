import { useState } from 'react'
import { Button } from '../components/ui/button'

export default function Home() {
    const [count, setCount] = useState(0)
    return (
        <div>
            <h1>Home</h1>
            <p>Count: {count}</p>
            <Button onClick={() => setCount(count + 1)}>Increment</Button>
        </div>
    )
}