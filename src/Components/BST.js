import React, { useEffect, useState } from 'react'
import Grid from './Grid';
import { useSnackbar } from 'notistack';
import { Tooltip } from '@material-ui/core';
import { FaCode }from 'react-icons/fa'
import { HiOutlineRefresh }from 'react-icons/hi'

function BST() {
    const [binaryTree, setBinaryTree] = useState([
        [0],
        [0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]);
    const [height, setHeight] = useState(0);
    const [grid, setGrid] = useState([]);
    const [loading, setLoading] = useState(true);
    const [input, setInput] = useState('');
    const { enqueueSnackbar } = useSnackbar();
    const [search, setSearch] = useState(-2);
    const [showAnimation, setShowAnimation] = useState(true);

    
    useEffect(() => {
        makeVisualTree();
    }, [binaryTree])

    
    const makeVisualTree = () => {
        var i, j, k;
        var myList = [];

        for(i = 0; i < height; i ++){
            // var noOfElements = Math.pow(2, i);
            var noOfZerosInMiddle = Math.pow(2, height-i) - 1;
            var tempList = [];
            for(j = 0; j < binaryTree[i].length; j ++){
                tempList.push(binaryTree[i][j]);
                if(j < binaryTree[i].length - 1){
                    for(k = 0; k < noOfZerosInMiddle; k++ ){
                        tempList.push(0);
                    }
                }
            }
            myList.push(tempList);
        }
        setGrid(myList)
    }

    var iForAnimation = 0; 
    const createAnimation = (compare) => {
        if(showAnimation){
            setTimeout(function() { 
                // console.log('hello');   
                setSearch(compare[iForAnimation]);
                iForAnimation ++;                   
                if (iForAnimation < compare.length) {          
                createAnimation(compare);             
                }               
            }, 1000)
        }
        else{
            setSearch(compare[compare.length - 1]);
        }
    }


    const insertToTree = (data) => {
        const newTree = [...binaryTree];
        var compare = [];
        const prevSearch = search;

        if(newTree[0][0] === 0 ){
            newTree[0][0] = parseInt(data);
            setBinaryTree(newTree);
            setHeight(1);
            enqueueSnackbar(data + " added to binary search tree.", {
                variant: 'success',
            });
            // console.log(binaryTree, " ", height);
            return;
        }
        
        var i, j=0;
        for(i = 0; i < height && i < 6; i++){
            if(data < newTree[i][j]){
                if(newTree[i+1][2*j] === 0){
                    newTree[i+1][2*j] = parseInt(data);
                    setBinaryTree(newTree);
                    setHeight(Math.max(height, i + 2));
                    enqueueSnackbar(data + " added to binary search tree.", {
                        variant: 'success',
                    });
                    // console.log(binaryTree, " ", height);
                    compare.push(newTree[i][j]);
                    compare.push(parseInt(data));
                    compare.push(prevSearch);
                    setSearch(compare[0]);
                    compare.shift();
                    iForAnimation = 0;
                    createAnimation(compare);
                    return;
                }
                else{
                    compare.push(newTree[i][j]);
                    j = 2*j;
                }
            }
            else if(data > newTree[i][j]){
                if(newTree[i+1][2*j + 1] === 0){
                    newTree[i+1][2*j + 1] = parseInt(data);
                    setBinaryTree(newTree);
                    setHeight(Math.max(height, i + 2));
                    enqueueSnackbar(data + " added to binary search tree.", {
                        variant: 'success',
                    });
                    // console.log(binaryTree, " ", height);
                    compare.push(newTree[i][j]);
                    compare.push(parseInt(data));
                    compare.push(prevSearch);
                    setSearch(compare[0]);
                    compare.shift();
                    iForAnimation = 0;
                    createAnimation(compare);
                    return;
                }
                else{
                    compare.push(newTree[i][j]);
                    j = j*2 + 1 
                }
            }
            else{
                enqueueSnackbar(data +" is already present", {
                    variant: 'error',
                });
                return;
            }
        }

        enqueueSnackbar("Maximum height reaced :(", {
            variant: 'error',
        });

    }


    const afterDeletePosi = (oldI, oldJ, newI, newJ, newTree) => {
        newTree[newI + 1][newJ*2] = newTree[oldI + 1][oldJ*2]; 
        newTree[oldI + 1][oldJ*2] = 0;
        newTree[newI + 1][newJ*2 + 1] = newTree[oldI + 1][oldJ*2 + 1]; 
        newTree[oldI + 1][oldJ*2 + 1] = 0;
        if(newTree[newI + 1][newJ*2] !== 0){
            newTree = afterDeletePosi(oldI + 1, oldJ*2, newI+1, newJ*2, newTree);
        }
        if(newTree[newI + 1][newJ*2 + 1] !== 0){
            newTree = afterDeletePosi(oldI + 1, oldJ*2 + 1, newI+1, newJ*2 + 1, newTree);
        }
        return newTree;
    }


    const deleteFromTree = (data) => {
        data = parseInt(data);
        var i, j, k;
        var newTree = [...binaryTree];
        for(i = 0; i < height  && i < 6; i ++){
            for(j = 0; j < newTree[i].length; j ++){
                if(newTree[i][j] === data){
                    // alert("Found");

                    // For no left and right
                    if(newTree[i + 1][2*j] === 0 && newTree[i + 1][2*j + 1] === 0){
                        newTree[i][j] = 0;
                        setBinaryTree(newTree);
                        for(k = 0; k < newTree[i].length; k++){
                            if(newTree[i][k] !== 0){
                                break;
                            }
                        }
                        if(k === newTree[i].length){
                            setHeight(i);
                        }
                        if(data !== -1){
                            enqueueSnackbar(data + " deleted from binary search tree.", {
                                variant: 'success',
                            });
                        }
                        return;
                    }

                    // If right empty
                    else if(newTree[i + 1][2*j + 1] === 0){
                        newTree[i][j] = newTree[i+1][2*j];
                        newTree = afterDeletePosi(i + 1, 2*j, i, j, newTree);
                        setBinaryTree(newTree);
                        if(data !== -1){
                            enqueueSnackbar(data + " deleted from binary search tree.", {
                                variant: 'success',
                            });
                        }
                        return;
                    }

                    // If left empty
                    else if(newTree[i + 1][2*j] === 0){
                        newTree[i][j] = newTree[i+1][2*j + 1];
                        newTree = afterDeletePosi(i + 1, 2*j + 1, i, j, newTree);
                        setBinaryTree(newTree);
                        if(data !== -1){
                            enqueueSnackbar(data + " deleted from binary search tree.", {
                                variant: 'success',
                            });
                        }
                        return;
                    }

                    // if both full
                    else{
                        var startI = i +1;
                        var startJ = j*2 + 1;
                        while(true){
                            if(newTree[startI + 1][startJ*2] === 0){
                                newTree[i][j] = newTree[startI][startJ];
                                newTree[startI][startJ] = -1;
                                setBinaryTree(newTree);
                                enqueueSnackbar(data + " deleted from binary search tree.", {
                                    variant: 'success',
                                });
                                deleteFromTree(-1);
                                return;
                                
                            }
                            else{
                                startI = startI + 1;
                                startJ = startJ*2;
                            }
                        }
                    }

                }
            }
        }
        if(i === 6){
            for(j = 0; j < newTree[i].length; j++){
                if(newTree[i][j] === data){
                    newTree[i][j] = 0;
                    for(k = 0; k < newTree[i].length; k++){
                        if(newTree[i][k] !== 0){
                            break;
                        }
                    }
                    if(k === newTree[i].length){
                        setHeight(i);
                    }
                    setBinaryTree(newTree);
                    enqueueSnackbar(data + " deleted from binary search tree.", {
                        variant: 'success',
                    });
                    return;
                }
            }
        }

        enqueueSnackbar(data + " not found !!", {
            variant: 'error',
        });
    }


    const searchInTree = (data) => {
        data = parseInt(data);
        var i, j;
        // var newTree = [...binaryTree];
        for(i = 0; i < height  && i <= 6; i ++){
            for(j = 0; j < binaryTree[i].length; j ++){
                if(binaryTree[i][j] === data){
                    enqueueSnackbar(data + " found. Highlighted in green.", {
                        variant: 'success',
                    });
                    return;
                }
            }
        }

        setSearch(-2);
        enqueueSnackbar(data + " not found !!", {
            variant: 'error',
        });
    }


    const clearTree = () => {
        var newTree = [
            [0],
            [0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
        if(height > 0 || grid.length > 0){
            // console.log("doing");
            setBinaryTree(newTree);
            setGrid([]);
            setHeight(0);
        }
        enqueueSnackbar("Binary Tree Cleared.", {
            variant: 'success',
        });
    }


    const handleSubmit = (e) =>{
        e.preventDefault();
        var operation = e.target.value;

        if(operation === "ClearSearch"){
            setSearch(-2);
            setInput('');
            setLoading(true);
            return
        }

        if(operation === "ClearTree"){
            clearTree();
            setSearch(-2);
            setInput('');
            setLoading(true);
            return
        }

        if(input ===  '' || input <= 0){
            enqueueSnackbar("Invalid input !!", {
                variant: 'error',
            });
            setInput('');
            return;
        }
        // return;
        if(operation === "Insert"){
            insertToTree(input);
            setInput('');
            setLoading(true);
        }
        else if(operation === "Delete"){
            deleteFromTree(input);
            setInput('');
            setLoading(true);
        }
        else if(operation === "Search"){
            setSearch(parseInt(input));
            searchInTree(input);
            setInput('');
            setLoading(true);
        }
        
    }


    const handleChange = e => {
        setInput(e.target.value);
    };


    return (
        <div className="main-outer-div">
            <div className="form-div">
                <input 
                    id="input_box"
                    type="number" 
                    placeholder="Data" 
                    value={input}
                    className="operation-input"
                    onChange={handleChange}
                />
                <button onClick={handleSubmit} className="operation-button" value="Insert" >Insert</button>
                <button onClick={handleSubmit} className="operation-button" value="Delete" >Delete</button>
                <button onClick={handleSubmit} className="operation-button" value="Search" >Search</button>

                <button 
                    onClick={handleSubmit} 
                    className="function-button" 
                    style={{marginLeft:"80px"}} 
                    value="ClearSearch" >
                        Clear Search
                </button>
                <button 
                    onClick={handleSubmit} 
                    className="function-button" 
                    value="ClearTree" >
                        Clear Tree
                </button>
                
                <span><Tooltip title='Show Animation' placement='bottom' arrow>
                    <label className="switch">
                        <input type="checkbox" checked={showAnimation} onChange={() => {setShowAnimation(!showAnimation)}} />
                        <span className="slider round"></span>
                    </label>
                </Tooltip></span>
                <Tooltip title='Source Code' placement='bottom' arrow>
                    <span>
                        <button onClick={() => {window.location.href = "https://github.com/Shlok-Zanwar/Binary-Tree-Visualization"}} className="function-button">
                            <FaCode style={{fontSize:"21px"}} />
                        </button>
                    </span>
                </Tooltip>
                <Tooltip title='Refresh lines' placement='bottom' arrow>
                    <span>
                        <button onClick={() => {setLoading(true)}} className="function-button">
                            <HiOutlineRefresh style={{fontSize:"21px"}}  />
                        </button>
                    </span>
                </Tooltip>

            </div>
            <Grid grid={grid} loading={loading} setLoading={setLoading} search={search} />
        </div>
    )
}

export default BST
