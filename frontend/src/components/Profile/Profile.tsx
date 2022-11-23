import { useState, useEffect, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useSearchParams } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';
import Swal from 'sweetalert2';

import './Profile.css';

import { retrievePosts, updateStateOfPost, getSinglePostData } from '../../services/fetchData';
import { getNumberOfFavs } from '../../services/fetchWishList';
import { createNewOrder } from '../../services/fetchOrders';
import { PostLists } from '../PostLists/PostLists';
import { UserInfo } from '../UserInfo/UserInfo';
import { UserContext } from '../../context/UserContext';
import { postDetails } from '../../types/Post';

export const Profile = () => {
  const { userData } = useContext(UserContext);
  const { user } = useAuth0();
  const [searchParams] = useSearchParams();
  const [posts, setPosts] = useState<postDetails[]>([]);
  const [numberOfFavs, setNumberOfFavs] = useState<number>(0);

  useEffect(() => {
    if (user) {
      retrievePosts(user.email as string).then(data => setPosts(data));
      if (userData) {
        getNumberOfFavs(userData.id).then(result => setNumberOfFavs(result.number));
      }
    }
  }, [user, userData]);

  useEffect(() => {
    if (searchParams.get('success') === 'true') {
      const idPost = searchParams.get('itemId') as string;
      const userId = searchParams.get('userId') as string;

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

  return (
    <section className="profileSection">
      {user ? (
        <div className="profileContainer">
          <UserInfo user={user} postNumber={posts.length} numberOfFavs={numberOfFavs} />

          <div className="listContainer__posts">
            <PostLists postsList={posts} setPostList={undefined} />
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
