const User = require('../models/User');
const { sendSuccess, sendError } = require('../utils/response');

// 사용자 프로필 업데이트
const updateProfile = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return sendError(res, 'User not found', 404);
    }

    const updatedUser = await user.update({ name });
    sendSuccess(res, updatedUser.toJSON(), 'Profile updated successfully');

  } catch (error) {
    console.error('Update profile error:', error);
    sendError(res, 'Failed to update profile', 500);
  }
};

// 비밀번호 변경
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    if (!currentPassword || !newPassword) {
      return sendError(res, 'Current password and new password are required', 400);
    }

    if (newPassword.length < 6) {
      return sendError(res, 'New password must be at least 6 characters', 400);
    }

    const user = await User.findById(userId);
    if (!user) {
      return sendError(res, 'User not found', 404);
    }

    // 현재 비밀번호 확인
    const isValidPassword = await user.comparePassword(currentPassword);
    if (!isValidPassword) {
      return sendError(res, 'Current password is incorrect', 400);
    }

    // 비밀번호 업데이트
    await user.update({ password: newPassword });
    sendSuccess(res, null, 'Password changed successfully');

  } catch (error) {
    console.error('Change password error:', error);
    sendError(res, 'Failed to change password', 500);
  }
};

// 사용자 삭제 (계정 탈퇴)
const deleteAccount = async (req, res) => {
  try {
    const { password } = req.body;
    const userId = req.user.id;

    if (!password) {
      return sendError(res, 'Password is required to delete account', 400);
    }

    const user = await User.findById(userId);
    if (!user) {
      return sendError(res, 'User not found', 404);
    }

    // 비밀번호 확인
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return sendError(res, 'Password is incorrect', 400);
    }

    // 사용자 삭제 (실제로는 soft delete를 권장)
    // await user.delete();
    sendSuccess(res, null, 'Account deletion requested (not implemented yet)');

  } catch (error) {
    console.error('Delete account error:', error);
    sendError(res, 'Failed to delete account', 500);
  }
};

module.exports = {
  updateProfile,
  changePassword,
  deleteAccount
};