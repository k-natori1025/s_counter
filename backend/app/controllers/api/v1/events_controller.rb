class Api::V1::EventsController < ApplicationController

  def index
    store_id = params[:store_id]
    events = Event.where(store_id: store_id)
    render json: events 
  end

  def create
    # @event = Event.new(event_params)
    @event = Event.new(event_params)

    if @event.save
      render json: { status: :created, event: @event }
    else
      render json: { status: 500 }
    end
  end

  def destroy
    if Event.destroy(params[:id])
      store_id = params[:store_id]
      events = Event.where(store_id: store_id)
      render json: events
    else
      render json: { error: "Failed to destroy" }, status: 422
    end
  end

  def destroy_all
    if Event.destroy_all
      head :no_content
    else
      render json: { error: "Failed to destroy" }, status: 422
    end
  end

  private

    def event_params
      params.require(:event).permit(:event_name, :time, :person, :heat, :store_id)
    end

end