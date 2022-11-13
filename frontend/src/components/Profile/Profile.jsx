import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useSearchParams } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
import Swal from 'sweetalert2';

import './Profile.css';

import { retrievePosts, updateStateOfPost, getSinglePostData } from '../../services/fetchData';
import { createNewOrder } from '../../services/fetchOrders';
import { PostLists } from '../PostLists/PostLists';
import { UserInfo } from '../UserInfo/UserInfo';

export const Profile = () => {
  const { user } = useAuth0();
  const [searchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (searchParams.get('success') === 'true') {
      const idPost = searchParams.get('itemId');
      const userId = searchParams.get('userId');

      getSinglePostData(idPost).then(postData => {
        if (!postData.sold) {
          console.log('Render');
          createNewOrder(userId, idPost).then(data => {
            if (data.id) {
              updateStateOfPost(idPost);

              Swal.fire({
                title: 'Thanks for supporting crafting community',
                text: `Order number: ${data.id}`,
                icon: 'success',
                timer: 5000,
              });
            }
          });
        }
      });
    }
  }, [searchParams]);

  useEffect(() => {
    if (user) {
      retrievePosts(user.email).then(data => setPosts(data));
    }
  }, [user]);

  return (
    <section className="profileSection">
      {user ? (
        <div className="profileContainer">
          <UserInfo user={user} postNumber={posts.length} />

          <div className="listContainer__posts">
            <PostLists postsList={posts} />
          </div>
        </div>
      ) : (
        <div className="w-full h-screen flex justify-center items-center">
          <RotatingLines strokeColor="grey" strokeWidth="5" animationDuration="0.75" width="200" visible={true} />
        </div>
      )}
    </section>
  );
};
