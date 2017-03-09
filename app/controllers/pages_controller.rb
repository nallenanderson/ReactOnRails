class PagesController < ApplicationController
  def home
    @lost_beaver = view_context.image_path('lost_beaver.png')
    @chop_beaver = view_context.image_path('chop_beaver.png')
  end

  def about
  end

  def contact
  end

  def survey
    @params = request.path_parameters[:id]
    @lost_beaver = view_context.image_path('lost_beaver.png')
    @chop_beaver = view_context.image_path('chop_beaver.png')
  end
end
