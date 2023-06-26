class Api::V1::EventsController < ApplicationController

  def index
    events = Event.order(created_at: :desc)
    render json: events 
  end

  def create
    # @event = Event.new(event_params)
    @event = current_store.events.new(event_params)

    if @event.save
      render json: { status: :created, event: @event }
    else
      render json: { status: 500 }
    end
  end

  def destroy
    if Event.destroy(params[:id])
      head :no_content
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
      params.require(:event).permit(:event_name, :time, :person, :heat)
    end

end