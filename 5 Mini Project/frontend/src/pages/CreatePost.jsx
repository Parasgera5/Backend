import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const CreatePost = () => {
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        try {
            const response = await axios.post('http://localhost:3000/create-post', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate('/feed'); // navigate to the feed page after successful post creation
            console.log(response.data);
        } catch (error) {
            console.error('Error creating post:', error);
        }
    }

  return (
    <section className='create-post-section'>
        <h1>Create Post</h1>
        <form onSubmit={handleSubmit} action="">
            <input type="file" name='image' accept='image/*' />
            <input type="text" name='caption' required />
            <button type='submit' placeholder='Enter Caption' >Submit</button>
        </form>
    </section>
  )
}

export default CreatePost