import { ReactNode } from "react"
import LateralMenu from "./LateralMenu"

interface ContainerProps {
    children: ReactNode
}

const Container: React.FC<ContainerProps> = ({
    children
}) => {
    return (
        <div
            className="
              flex
          "
        >
            <LateralMenu />
            <main
                className="
                    
                "
            >
                {children}
            </main>
        </div>
    )
}

export default Container