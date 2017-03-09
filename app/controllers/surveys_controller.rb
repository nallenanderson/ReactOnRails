class SurveysController < ApplicationController
  def index
  end

  def show
    @params = request.path_parameters[:id]
    @lost_beaver = view_context.image_path('lost_beaver.png')
    @chop_beaver = view_context.image_path('chop_beaver.png')
  end
end
