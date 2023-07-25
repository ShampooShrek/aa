import * as S from "./style"

const AppHeader = () => {

  const handleButtonClick = (key: string) => {
    window.app.send(key, null)
  }

  return (
    <S.HeaderContainer>
      <S.HeaderLogo>LOGO</S.HeaderLogo>
      <S.ButtonsContainer>
        <S.Button onClick={() => handleButtonClick("minimize-window")}>-</S.Button>
        <S.Button onClick={() => handleButtonClick("maximize-window")}>+</S.Button>
        <S.Button onClick={() => handleButtonClick("close-window")}>x</S.Button>
      </S.ButtonsContainer>
    </S.HeaderContainer>
  )
}

export default AppHeader