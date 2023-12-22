import { ReactNode } from "react"
import LateralMenu from "./LateralMenu"
import MainContainer from "./MainContainer"

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
            <MainContainer>
                {children}
            </MainContainer>
        </div>
    )
}

export default Container