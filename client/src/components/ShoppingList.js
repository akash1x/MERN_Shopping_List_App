import React from 'react'
import {Container,ListGroup,ListGroupItem,Button} from 'reactstrap';
import {CSSTransition,TransitionGroup} from 'react-transition-group';
import { useSelector, useDispatch } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import { useEffect } from 'react';

const ShoppingList = () => {

    const items = useSelector(state=>state.item.items);
    const dispatch = useDispatch();
    useEffect(() => {
          dispatch(getItems());
    }, [])

    const removeItem=(id)=>{
      dispatch(deleteItem(id));
    }
    return (
        <Container>
            <ListGroup>
                <TransitionGroup className="shopping-list">
                    {items.map(({_id,name})=>(
                        <CSSTransition key={_id} timeout={500} classNames="fade">
                            <ListGroupItem>
                                <Button className="remove-btn" style={{marginRight:'0.5rem'}} color="danger" size="sm" onClick={()=>removeItem(_id)}>&times;</Button>
                                {name}
                            </ListGroupItem>
                        </CSSTransition>
                        ))}
                </TransitionGroup>
            </ListGroup>
        </Container>
    )
}

export default ShoppingList
