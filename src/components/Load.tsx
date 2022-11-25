import ClipLoader from "react-spinners/ClipLoader";

export default function Load() {
    return(
        <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <ClipLoader
              color="#FFF"
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
  
            />
        </div>
    )
}