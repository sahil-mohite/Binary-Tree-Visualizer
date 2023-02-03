import React, { useEffect } from 'react'
import LineTo from 'react-lineto'

function Grid({grid, loading, setLoading, search}) {


    function debounce(fn, ms) {
        let timer
        return _ => {
            clearTimeout(timer)
            timer = setTimeout(_ => {
                timer = null
                fn.apply(this, arguments)
            }, ms)
        };
    }


    useEffect(() => {
        const debouncedHandleResize = debounce(function handleResize() {
            setLoading(true);
        }, 500)
        
        window.addEventListener('resize', debouncedHandleResize)
    })


    useEffect(() => {
        setTimeout(() => setLoading(false), 100);
    }, [loading])


    const makeOneRow = (row, rowIndex) => 
        row.map((cell, cellIndex) => {
            if(cell !== 0){
                if(cell === search){

                    return(
                        <div className={"tree-node-div r" + rowIndex.toString() + "c" + cellIndex.toString() + " searched"} key={"r" + rowIndex.toString() + "c" + cellIndex.toString()}>
                            {/* {rowIndex.toString() + " " + cellIndex.toString()} */}
                            {cell}
                        </div>
                    )
                }
                else{
                    return(
                        <div className={"tree-node-div r" + rowIndex.toString() + "c" + cellIndex.toString()} key={"r" + rowIndex.toString() + "c" + cellIndex.toString()}>
                            {/* {rowIndex.toString() + " " + cellIndex.toString()} */}
                            {cell}
                        </div>
                    )
                }
            }
            else{
                return(
                    <div className={"tree-node-div r" + rowIndex.toString() + "c" + cellIndex.toString() + " transparent"} key={"r" + rowIndex.toString() + "c" + cellIndex.toString()}>
                        {}
                    </div>
                )
            }
        })


    const makeRows = () => {
        return grid.map((row, rowIndex) => (
            <div className="rows" key={"r" + rowIndex.toString()}>
                {makeOneRow(row, rowIndex)}
            </div>
        ))
    }

    
    var zIndex = -1;
    var makeArrows = () => {
        return(
            grid.map((row, rowIndex) => {
                return(
                    row.map((cell, cellIndex) => {
                        if(cell !== 0 && rowIndex < grid.length - 1){
                            // console.log("r"+(rowIndex).toString() + "c" + cellIndex.toString() + "   " + "r"+(rowIndex+1).toString() + "c" + cellIndex.toString() );
                            
                            var leftChild = cellIndex;
                            var rightChild = cellIndex + Math.pow(2, grid.length-rowIndex-1);

                            // console.log(rowIndex, " ", leftChild, " " , rightChild);

                            if(grid[rowIndex+1][leftChild] !== 0 && grid[rowIndex+1][rightChild] !== 0){
                                return(
                                    <>
                                    <LineTo 
                                        from={"r"+(rowIndex).toString() + "c" + cellIndex.toString()} 
                                        to={"r"+(rowIndex+1).toString() + "c" + leftChild.toString()} 
                                        zIndex={zIndex}
                                        borderColor="rgba(255, 84, 17, 1)" 
                                        borderWidth={5}  
                                        // fromAnchor="bottom center" 
                                        // toAnchor="top center"  
                                        key={"r"+(rowIndex).toString()+"c"+cellIndex.toString()+"r"+(rowIndex+1).toString()+"c"+leftChild.toString()} 
                                    />
                                    <LineTo 
                                        from={"r"+(rowIndex).toString() + "c" + cellIndex.toString()} 
                                        to={"r"+(rowIndex+1).toString() + "c" + rightChild.toString()} 
                                        zIndex={zIndex}
                                        borderColor="rgba(255, 84, 17, 1)" 
                                        borderWidth={5}  
                                        // fromAnchor="bottom center" 
                                        // toAnchor="top center"  
                                        key={"r"+(rowIndex).toString()+"c"+cellIndex.toString()+"r"+(rowIndex+1).toString()+"c"+rightChild.toString()} 
                                    />
                                    </>
                                )
                            }
                            else if(grid[rowIndex+1][leftChild] !== 0){
                                return(
                                    <LineTo 
                                        from={"r"+(rowIndex).toString() + "c" + cellIndex.toString()} 
                                        to={"r"+(rowIndex+1).toString() + "c" + leftChild.toString()} 
                                        zIndex={zIndex}
                                        borderColor="rgba(255, 84, 17, 1)" 
                                        borderWidth={5}
                                        // fromAnchor="bottom center" 
                                        // toAnchor="top center"  
                                        key={"r"+(rowIndex).toString()+"c"+cellIndex.toString()+"r"+(rowIndex+1).toString()+"c"+leftChild.toString()}
                                    />
                                )
                            }
                            else if(grid[rowIndex+1][rightChild] !== 0){
                                return(
                                    <LineTo 
                                        from={"r"+(rowIndex).toString() + "c" + cellIndex.toString()} 
                                        to={"r"+(rowIndex+1).toString() + "c" + rightChild.toString()} 
                                        zIndex={zIndex}
                                        borderColor="rgba(255, 84, 17, 1)" 
                                        borderWidth={5}  
                                        // fromAnchor="bottom center" 
                                        // toAnchor="top center"   
                                        key={"r"+(rowIndex).toString()+"c"+cellIndex.toString()+"r"+(rowIndex+1).toString()+"c"+rightChild.toString()}
                                    />
                                )
                            }

                        }
                    })
                )
            })
        )
    }


    return(
        <div className="tree-outer-div">
            <div className="tree-main-div">
                {makeRows()}
                {loading ? null : makeArrows() }
            </div>
        </div>
    )

}

export default Grid;
