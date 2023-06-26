class Api::V1::UsersController < ApplicationController
  

  # def index
  #   users = User.order(updated_at: :desc)
  #   render json: users
  # end

  # def show
  #   user = User.find(params[:id])
  #   render json: user
  # end

  # def create
  #   user = User.new(user_params)
  #   if user.save
  #     render json: user
  #   else
  #     render json: user.errors, status: 422
  #   end
  # end

  # def update
  #   user = User.find(params[:id])
  #   if user.update(user_params)
  #     render json: user
  #   else
  #     render json: user.errors, status: 422
  #   end
  # end

  # def destroy
  #   if User.destroy(params[:id])
  #     head :no_content
  #   else
  #     render json: { error: "Failed to destroy" }, status: 422
  #   end
  # end

  # private

  # def user_params
  #   params.require(:user).permit(:name, :email, :password)
  # end
end