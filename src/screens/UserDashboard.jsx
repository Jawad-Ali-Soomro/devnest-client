import { API_BASE_URL } from '@/constant'
import { useFetchUser } from '@/hooks/FetchUser'
import axios from 'axios'
import { Share2 } from 'lucide-react'
import { Share, MessageCircle, Heart, ArrowDown, ArrowUp } from 'lucide-react'
import React from 'react'

const PostCard = ({ post }) => {
const [showMore, setShowMore] = React.useState(false)

const toggleDescription = () => {
  setShowMore((prev) => !prev)
}

const shortDesc = post.description?.slice(0, 110)

return (
  <div className="bg-[white] border text-black p-5 flex flex-col w-full md:w-[50%] gap-2 rounded-xl shadow-md">
    
    <div className="flex items-center gap-0 pl-5 pt-2">
      <img
        src={`${API_BASE_URL}/uploads/profiles/${post.author.avatar}`}
        alt="avatar"
        className="w-14 h-14 rounded-full object-cover"
      />
    </div>

    <h1 className='lilita text-[25px] pl-5' style={{
      fontWeight: 900
    }}>{post.title}</h1>

    <div className="text-sm text-gray-900 px-5 text-justify w-[100%] relative justify-between items-end flex flex-col">
    <p className='w-[100%] text-justify text-[17px]'>  {showMore ? post.description : shortDesc}</p>
    {
      post.description.length > 100 && 
        <div className="line w-[90%] h-[1px] border absolute bottom-[25px] right-[75px]"></div>
    }
      {post.description?.length > 100 && (
        <button
          onClick={toggleDescription}
          className="flex items-center gap-1 w-[50px] flex mt-5 items-center justify-center cursor-pointer h-[50px] bg-[#eee]  text-[#eb133c] mt-1"
        >
          {showMore ? <><ArrowUp size={16} /></> : <><ArrowDown size={16} /></>}
        </button>
      )}
    </div>

    <img
      src={`${API_BASE_URL}/uploads/${post.thumbnail}`}
      alt="thumbnail"
      className="w-full object-cover rounded-xl border border-black/10"
      style={{
        marginTop: post.description.length < 100 && "40px"
      }}
    />

    <div className="flex justify-between w-full items-center text-sm pt-2 border-t border-black/10" style={{
      borderRadius: 0
    }}>
      <div className="flex w-full justify-between mt-1">
        <button className="flex items-center rounded-xl cursor-pointer justify-center h-14 w-[33%] bg-black/5 gap-1 hover:text-[#eb133c]">
          <Heart className='icon' />
        </button>
        <button className="flex items-center rounded-xl cursor-pointer justify-center h-14 w-[33%] bg-black/5 gap-1 hover:text-[#eb133c]">
          <MessageCircle className='icon' />
        </button>
        <button className="flex items-center rounded-xl cursor-pointer justify-center h-14 w-[33%] bg-black/5 gap-1 hover:text-[#eb133c]">
          <Share2 className='icon' />
        </button>
      </div>
    </div>
  </div>
)
}

const UserDashboard = () => {
const [posts, setPosts] = React.useState([])

const fetchPosts = async () => {
  const res = await axios.get(`${API_BASE_URL}/api/post/get/all`)
  setPosts(res.data)
}

React.useEffect(() => {
  fetchPosts()
}, [])

const {user} =  useFetchUser()

return (
 <div className="flex">
   <div className="gap-6 p-6  flex flex-col items-center w-full min-h-screen">
    {posts.map((post, idx) => (
      <PostCard key={idx} post={post} />
    ))}
    <p className='uppercase'> &copy; All Rights reserved devnest.com 2025</p>
  </div>
 <div className="right w-[320px] hidden md:flex fixed top-10 right-10 items-center justify-center p-5 flex-col bg-[#eee] rounded-xl shadow-md">
  <img src='/logo.png' className='h-[80px]' alt="logo" />

  <h1 className='uppercase text-[10px] text-center mt-2'>
    <span className='text-[#eb133c]'>Boost</span> your <span className='text-[#eb133c]'>career</span> with our{" "}
    <span className='text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 font-bold'>premium</span> support
  </h1>

  <div className="flex justify-between w-full mt-4 items-center">
    <img src={`${API_BASE_URL}/uploads/profiles/${user?.avatar}`} alt="User avatar" className='w-[60px] rounded-full' />
    <div className="line w-[100px] h-[1px] bg-black"></div>
    <div className="w-[60px] h-[60px] bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"></div>
  </div>

  <button className="mt-4 w-full h-14 uppercase bg-[#eb133c] text-white font-semibold rounded-lg hover:bg-[#c5112f] transition duration-300">
    Try Now – $10
  </button>
</div>

 </div>
)
}

export default UserDashboard
