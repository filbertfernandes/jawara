import { useGame } from '../useGame.jsx'

export default function GameInterface()
{
    const { changePhase, canChangePhase, setCanChangePhase, canPressEnter, setCanPressEnter } = useGame((state) => ({
        changePhase: state.changePhase,
        canChangePhase: state.canChangePhase,
        setCanChangePhase: state.setCanChangePhase,
        canPressEnter: state.canPressEnter,
        setCanPressEnter: state.setCanPressEnter,
    }))
    
    const handleEnterButtonClick = () => {
        if(canChangePhase.condition && canChangePhase.phase != '') {
            changePhase(canChangePhase.phase)
            setCanPressEnter(false)
            setCanChangePhase(false, '')
        }
    }

    return (
        <>
            {/* ENTER BUTTON */}
            <div className={ `press-enter-box ${canPressEnter === false ? 'hidden' : ''}` } >
                <div className={ `press-enter` } onClick={ handleEnterButtonClick }>
                    Enter
                </div>
            </div>
        </>
    )

}
