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
            <MainContainer>
                {children}
            </MainContainer>
            <LateralMenu />
        </div>
    )
}

export default Container