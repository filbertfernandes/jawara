import { useGame } from '../../useGame.jsx'

export default function FreePhaseInterface()
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
          <div className={ `flex justify-center absolute bottom-0 left-0 w-full text-white text-3xl p-1 mb-2 font-bebas ${canPressEnter ? '' : 'opacity-0 pointer-events-none'} ` }>
            <div 
              className="w-[30%] bg-sky-500 text-center cursor-pointer sm:w-[15%] lg:w-[10%]"
              onClick={handleEnterButtonClick}
            >
              Enter
            </div>
          </div>
        </>
      )
      

}
