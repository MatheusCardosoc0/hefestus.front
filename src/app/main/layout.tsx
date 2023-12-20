import Container from "@/components/Container"
import { ReactNode } from "react"

const layout = ({ children }: { children: ReactNode }) => {
    return (
        <Container>
            {children}
        </Container>
    )
}

export default layout