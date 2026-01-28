// src/components/user/ReviewModal.jsx
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  CircularProgress,
  Stack,
  Alert,
  useTheme,
} from '@mui/material';
import { Star, Edit, Send } from '@mui/icons-material';
import { createReview, updateReview } from '@services/reviewService';
import toast from 'react-hot-toast';

export default function ReviewModal({
  open,
  onClose,
  matchData,
  existingReview = null,
  onReviewSubmitted,
}) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const isEdit = !!existingReview;

  useEffect(() => {
    if (existingReview) {
      setComment(existingReview.comment || '');
    } else {
      setComment('');
    }
    setError('');
  }, [existingReview, open]);

  const handleSubmit = async () => {
    // Validation
    if (!comment.trim()) {
      setError('Please write a comment');
      return;
    }

    if (comment.trim().length < 10) {
      setError('Comment must be at least 10 characters');
      return;
    }

    if (comment.trim().length > 1000) {
      setError('Comment cannot exceed 1000 characters');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      let response;
      
      if (isEdit) {
        // Update existing review
        response = await updateReview(existingReview.reviewId, {
          comment: comment.trim(),
        });
        toast.success('Review updated successfully!');
      } else {
        // Create new review
        response = await createReview({
          revieweeId: matchData.counterpartId,
          matchRequestId: matchData.matchRequestId,
          comment: comment.trim(),
        });
        toast.success('Review posted successfully!');
      }

      if (onReviewSubmitted) {
        onReviewSubmitted(response.data);
      }

      setComment('');
      onClose();
    } catch (err) {
      console.error('Failed to submit review:', err);
      const errorMsg = err.response?.data?.message || 
                       err.response?.data?.error ||
                       'Failed to submit review';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!submitting) {
      setComment('');
      setError('');
      onClose();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          background: isDark ? '#1e1e2e' : '#ffffff',
          m: { xs: 2, sm: 3 },
        },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          {isEdit ? <Edit color="primary" /> : <Star color="primary" />}
          <Typography variant="h6" fontWeight={700} sx={{ fontSize: { xs: '1.125rem', sm: '1.25rem' } }}>
            {isEdit ? 'Edit Review' : 'Write a Review'}
          </Typography>
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        <Stack spacing={3}>
          {/* Match Info */}
          {matchData && (
            <Box
              sx={{
                p: 2.5,
                borderRadius: 2,
                background: isDark
                  ? 'rgba(102, 126, 234, 0.1)'
                  : 'rgba(102, 126, 234, 0.08)',
                border: `1px solid ${isDark ? 'rgba(102, 126, 234, 0.2)' : 'rgba(102, 126, 234, 0.15)'}`,
              }}
            >
              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}>
                {isEdit ? 'Your review for' : 'Writing review for'}
              </Typography>
              <Typography variant="h6" fontWeight={600} color="primary" sx={{ fontSize: { xs: '1rem', sm: '1.125rem' } }}>
                {matchData.counterpart}
              </Typography>
              {matchData.theirSkill && (
                <Typography variant="body2" sx={{ mt: 0.5, fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}>
                  Skill: <strong>{matchData.theirSkill}</strong>
                </Typography>
              )}
            </Box>
          )}

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          {/* Comment Input */}
          <TextField
            multiline
            rows={6}
            fullWidth
            label="Your Review"
            placeholder="Share your experience with this skill exchange... (min 10 characters)"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
              setError('');
            }}
            disabled={submitting}
            helperText={`${comment.length}/1000 characters`}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
              '& .MuiInputBase-input': {
                fontSize: { xs: '0.875rem', sm: '1rem' },
              },
            }}
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: { xs: 2, sm: 3 }, pt: 2 }}>
        <Button
          onClick={handleClose}
          disabled={submitting}
          sx={{ 
            borderRadius: 2, 
            fontWeight: 500,
            fontSize: { xs: '0.8125rem', sm: '0.875rem' },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={submitting || !comment.trim()}
          startIcon={submitting ? <CircularProgress size={20} /> : <Send />}
          sx={{
            borderRadius: 2,
            fontWeight: 600,
            px: { xs: 2, sm: 3 },
            fontSize: { xs: '0.8125rem', sm: '0.875rem' },
          }}
        >
          {submitting ? 'Submitting...' : isEdit ? 'Update' : 'Submit'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}