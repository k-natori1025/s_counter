class Api::V1::SessionsController < ApplicationController

  def login
    store = Store.find_by(email: session_params[:email])

    if store && store.authenticate(session_params[:password])
      # log_in store
      session[:store_id] = store.id
      render json: { logged_in: true, store: store }
    else
      render json: { status: 401, errors: ['認証に失敗しました。', '正しいメールアドレス・パスワードを入力し直すか、新規登録を行ってください。'] }
    end
  end

  def logout
    reset_session
    render json: { status: 200, logged_out: true }
  end

  def logged_in?
    if current_store
      render json: { logged_in: true, store: @current_store }
    else
      render json: { logged_in: false, message: 'ユーザーが存在しません' }
    end
  end

  private
    def session_params
      params.require(:store).permit(:email, :password)
    end

end