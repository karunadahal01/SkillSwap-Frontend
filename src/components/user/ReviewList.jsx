// src/components/user/ReviewList.jsx
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  CircularProgress,
  Stack,
  Avatar,
  Paper,
  Divider,
  IconButton,
  useTheme,
  Chip,
} from '@mui/material';
import { Close, Star, RateReview } from '@mui/icons-material';
import { getReviewsForUser } from '@services/reviewService';
import { format } from 'date-fns';

export default function ReviewList({ open, onClose, userId, userName }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open && userId) {
      fetchReviews();
    }
  }, [open, userId]);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const data = await getReviewsForUser(userId);
      setReviews(data);
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          background: isDark ? '#1e1e2e' : '#ffffff',
          m: { xs: 2, sm: 3 },
          maxHeight: '90vh',
        },
      }}
    >
      <DialogTitle sx={{ pb: 2 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Box
              sx={{
                width: { xs: 36, sm: 40 },
                height: { xs: 36, sm: 40 },
                borderRadius: 2,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <RateReview sx={{ color: 'white', fontSize: { xs: 20, sm: 24 } }} />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={700} sx={{ fontSize: { xs: '1.125rem', sm: '1.25rem' } }}>
                Reviews
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                {userName ? `Reviews for ${userName}` : 'User Reviews'}
              </Typography>
            </Box>
          </Stack>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress />
          </Box>
        ) : reviews.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, sm: 5 },
              textAlign: 'center',
              borderRadius: 2,
              background: isDark
                ? 'rgba(255,255,255,0.05)'
                : 'rgba(0,0,0,0.02)',
            }}
          >
            <Box
              sx={{
                width: { xs: 60, sm: 70 },
                height: { xs: 60, sm: 70 },
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2,
              }}
            >
              <Star sx={{ fontSize: { xs: 30, sm: 36 }, color: 'white' }} />
            </Box>
            <Typography variant="h6" fontWeight={600} sx={{ mb: 1, fontSize: { xs: '1rem', sm: '1.125rem' } }}>
              No reviews yet
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}>
              This user hasn't received any reviews yet
            </Typography>
          </Paper>
        ) : (
          <Stack spacing={2}>
            {/* Reviews Count */}
            <Box
              sx={{
                p: 2,
                borderRadius: 2,
                background: isDark
                  ? 'rgba(102, 126, 234, 0.1)'
                  : 'rgba(102, 126, 234, 0.08)',
                border: `1px solid ${isDark ? 'rgba(102, 126, 234, 0.2)' : 'rgba(102, 126, 234, 0.15)'}`,
              }}
            >
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Star sx={{ color: 'primary.main', fontSize: { xs: 24, sm: 28 } }} />
                <Box>
                  <Typography variant="h5" fontWeight={700} sx={{ fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
                    {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.8125rem', sm: '0.875rem' } }}>
                    Based on completed skill swaps
                  </Typography>
                </Box>
              </Stack>
            </Box>

            {/* Reviews List */}
            {reviews.map((review, index) => (
              <Paper
                key={review.reviewId}
                elevation={0}
                sx={{
                  p: { xs: 2.5, sm: 3 },
                  borderRadius: 2,
                  background: isDark ? '#1a1a2e' : '#ffffff',
                  border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: isDark
                      ? '0 8px 16px rgba(0,0,0,0.4)'
                      : '0 8px 16px rgba(0,0,0,0.08)',
                  },
                }}
              >
                {/* Reviewer Info */}
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                  <Avatar
                    src={review.reviewerAvatarUrl}
                    alt={review.reviewerUsername}
                    sx={{
                      width: { xs: 40, sm: 48 },
                      height: { xs: 40, sm: 48 },
                      bgcolor: 'primary.main',
                      fontSize: { xs: '1rem', sm: '1.2rem' },
                      fontWeight: 600,
                    }}
                  >
                    {review.reviewerUsername?.charAt(0)?.toUpperCase()}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body1" fontWeight={600} sx={{ fontSize: { xs: '0.9375rem', sm: '1rem' } }}>
                      {review.reviewerUsername}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                      {format(new Date(review.createdAt), 'MMM d, yyyy • h:mm a')}
                    </Typography>
                  </Box>
                  {review.updatedAt && review.updatedAt !== review.createdAt && (
                    <Chip
                      label="Edited"
                      size="small"
                      sx={{ fontSize: { xs: '0.65rem', sm: '0.7rem' }, height: 20 }}
                    />
                  )}
                </Stack>

                {/* Review Comment */}
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: { xs: '0.875rem', sm: '0.9375rem' },
                    lineHeight: 1.7,
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}
                >
                  {review.comment}
                </Typography>

                {index < reviews.length - 1 && <Divider sx={{ mt: 2 }} />}
              </Paper>
            ))}
          </Stack>
        )}
      </DialogContent>
    </Dialog>
  );
}