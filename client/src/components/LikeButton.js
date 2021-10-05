import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import {Button, Icon, Label, Popup} from 'semantic-ui-react';

function LikeButton({ user, post: { id, likeCount, likes}}) {

    const [liked, setLiked] = useState(false);

    // If user has already liked post, show highlight
    useEffect(() => {
        if(user && likes.find(like => like.username === user.username)) {
            setLiked(true)
        } else setLiked(false)
    }, [user, likes]);

    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: { postId: id },

        onError(error) {
            console.log(error);
        }

    });

    const likeButton = user ? (
        liked ? (
            <Button color='orange'>
                <Icon name='heart'/>
            </Button>
        ) : (
            <Button color='orange' basic>
                <Icon name='heart'/>
            </Button>
        )
    ) : (
        <Button as={Link} to="/login" color='orange' basic>
            <Icon name='heart'/>
        </Button>
    )

    return (
        <Popup
            content={liked ? 'Unlike' : 'Like'}
            inverted
            trigger={
                <Button as='div' labelPosition='right' onClick={likePost}>
                    {likeButton}
                    <Label basic color='orange' pointing='left'>
                        {likeCount}
                    </Label>
                </Button>
            }
        />
        );

}

const LIKE_POST_MUTATION = gql`

    mutation likePost($postId: ID!) {
        likePost(postId: $postId) {
            id
            likes {
                id username
            }
            likeCount
        }
    }

`

export default LikeButton