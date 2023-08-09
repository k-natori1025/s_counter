class Api::V1::PostsController < ApplicationController

  def index
    store_id = params[:store_id]
    posts = Post.where(store_id: store_id).order(id: :desc)
    render json: posts 
  end

  def create
    post = Post.new(post_params)
    if post.save
      render json: post
    else
      render json: { status: 500 }
    end
  end

  def destroy
    if Post.destroy(params[:id])
      store_id = params[:store_id]
      posts = Post.where(store_id: store_id).order(id: :desc)
      render json: posts
    else
      render json: { error: "Failed to destroy" }, status: 422
    end
  end

  private

    def post_params
      params.require(:post).permit(:content, :image, :store_id)
    end

end