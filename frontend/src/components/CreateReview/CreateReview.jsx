import './CreateReview.css';
import { FaStar } from "react-icons/fa6";
import { useModal } from '../../context/Modal';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNewReview } from '../../store/review.js';

const CreateReview = ({ userId, storeId }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const [body, setBody] = useState('');
    const [hoverRating, setHoverating] = useState(0);
    const [rating, setRating] = useState(0);
    const [errors, setErrors] = useState({});

    const isFormInvalid = !rating;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newReviewData = {
            userId,
            storeId,
            body,
            stars: rating
        };

        const trimedBody = body.trim();

        const validationErrors = {};

        if (body && !trimedBody) {
            validationErrors.body = "The review content cannot contain only spaces";
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        await dispatch(createNewReview(newReviewData, storeId));

        closeModal();
    };

    return (
        <div className="create-review-container">
            <form onSubmit={handleSubmit} className="create-review-form">

                <label>Overall Rating</label>
                <div className="review-stars">
                    {[1, 2, 3, 4, 5].map((star) => {
                        const isFilled = star <= (hoverRating || rating);

                        return (
                            <span key={star}
                                className={`star ${isFilled ? 'filled' : ""}`}
                                onMouseEnter={() => setHoverating(star)}
                                onMouseLeave={() => setHoverating(0)}
                                onClick={() => setRating(star)}
                            ><FaStar /></span>
                        );
                    })}
                </div>

                <label>Write Your Review</label>
                <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    rows="5"
                ></textarea>
                {errors.body && <p className="errors">{errors.body}</p>}

                <div>
                    <button id="cancel" type="button" onClick={closeModal}>Cancel</button>
                    <button id="create-review" type="submit" disabled={isFormInvalid}>Submit Review</button>
                </div>
            </form>
        </div>
    );
};

export default CreateReview;
