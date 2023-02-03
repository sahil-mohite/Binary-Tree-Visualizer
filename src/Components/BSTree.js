import React, { useEffect, useState } from 'react'
import Grid from './Grid';
import { useSnackbar } from 'notistack';
import { Tooltip } from '@material-ui/core';
import { FaCode }from 'react-icons/fa'
import { HiOutlineRefresh }from 'react-icons/hi'
import {BinarySearchTree} from './Tree'

function BSTree() {
    const [binaryTree, setBinaryTree] = useState([]);
    const [grid, setGrid] = useState([]);
    const [loading, setLoading] = useState(true);
    const [input, setInput] = useState('');
    const {enqueueSnackbar} = useSnackbar();
    const [search, setSearch] = useState(-2);
    const [showAnimation, setShowAnimation] = useState(true);
    const [BST, setBST] =  useState(new BinarySearchTree());


    useEffect(() => {
        makeVisualTree();
    }, [binaryTree])

    
    const makeVisualTree = () => {
        var i, j, k;
        var myList = [];
        const height = BST.treeHeight(BST.getRootNode()) + 1;

        for(i = 0; i < height; i ++){
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
            }, 700)
        }
        else{
            setSearch(compare[compare.length - 1]);
        }
    }


    const checkIfPresent = (data) => {
        var i, j;
        for(i = 0; i < binaryTree.length; i ++){
            for(j = 0; j < binaryTree[i].length; j ++){
                if(binaryTree[i][j] === data){
                    return true;
                }
            }
        }
        return false;
    }


    const insertToTree = (data) => {
        if(checkIfPresent(data)){
            enqueueSnackbar(data +" is already present !!", {
                variant: 'error',
            });
            return;
        }

        let animation = BST.insertNode(data);
        animation.push(search);
        createAnimation(animation);
        setBinaryTree(BST.breathFT(BST.getRootNode()));

        enqueueSnackbar(data + " added to binary search tree.", {
            variant: 'success',
        });
    }

    
    const deleteFromTree = (data) => {
        if(!checkIfPresent(data)){
            enqueueSnackbar(data + " not found !!", {
                variant: 'error',
            });
            return;
        }
    
        BST.deleteNode(data);
        setBinaryTree(BST.breathFT(BST.getRootNode()));

        enqueueSnackbar(data + " deleted from binary search tree.", {
            variant: 'success',
        });
    }


    const searchInTree = (data) => {
        var i, j;
        for(i = 0; i < binaryTree.length; i ++){
            for(j = 0; j < binaryTree[i].length; j ++){
                if(binaryTree[i][j] === data){
                    setSearch(data);
                    enqueueSnackbar(data + " found. Highlighted in green.", {
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


    const handleSubmit = (e) => {
        e.preventDefault();
        var operation = e.target.value;

        if(operation === "ClearSearch"){
            setSearch(-2);
            setInput('');
            setLoading(true);
            return;
        }

        if(operation === "ClearTree"){
            setBinaryTree([]);
            setSearch(-2);
            setInput('');
            setLoading(true);
            return;
        }

        if(input ===  '' || input <= 0){
            enqueueSnackbar("Invalid input !!", {
                variant: 'error',
            });
            setInput('');
            return;
        }
        if(operation === "Insert"){
            insertToTree(parseInt(input));
            setInput('');
            setLoading(true);
        }
        else if(operation === "Delete"){
            deleteFromTree(parseInt(input));
            setInput('');
            setLoading(true);
        }
        else if(operation === "Search"){
            searchInTree(parseInt(input));
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
                <Tooltip title='Refresh lines' placement='bottom' arrow>
                    <span>
                        <button onClick={() => {setLoading(true)}} className="function-button">
                            <HiOutlineRefresh style={{fontSize:"21px"}}  />
                        </button>
                    </span>
                </Tooltip>
                {/* <Tooltip title='Source Code' placement='bottom' arrow>
                    <span>
                        <button onClick={() => {window.location.href = "https://github.com/Shlok-Zanwar/Binary-Tree-Visualization"}} className="function-button">
                            <FaCode style={{fontSize:"21px"}} />
                        </button>
                    </span>
                </Tooltip> */}
            

            </div>
            <Grid grid={grid} loading={loading} setLoading={setLoading} search={search} />
        </div>
    )
}

export default BSTree
