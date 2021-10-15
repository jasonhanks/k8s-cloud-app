from flask import abort
from flask_restful import Resource
import os


class HealthHandler(Resource):
  """This class will handle health checks that should be available as /health on the server. The
    intention is that these checks will make sure we are available and ready to handle any 
    incoming requests for a specific Pod. 

    In order to do this successfully health checks will respond with a 200 HTML response code and optional
    JSON response. Otherwise an HTML response code of 500 (server error) is expected along with
    any available JSON error messages with available details.

    These are intended to be used for Kubernetes *liveness* and *readiness* probes to make sure a specific 
    Pod is still able to handle incoming requests. Error conditions should provide as much information as 
    possible as this is intended to be displayed to the container logging for debugging purposes.
    
    In this case we will provide mechanisms to create specific *failure* conditions for testing, but 
    otherwise the Pod will response as expected."""

  def get(self):
    """This handler is intended to be used by the "liveness" and "readiness" probe handler for Kubernetes 
      to make sure a particular Pod is still active. It should return a simple JSON object and a successful 
      response code (200) or the Pod should be destroyed and recreated until repeated failures forbid this
      any longer."""

    ## Failure: this is where any required dependencies should be verified and return appropriate failures.
    # Simulate a situation where we are not able to serve requests for testing purposes.
    if os.environ.get('HEALTH_FORCE_FAILURE') == "true":
      return abort(500) 

    ## Successful response
    # Return JSON with a successful response (HTML response code: 200) with an optional verbose message.
    return {
      'message': "OK"
      }

  def failure_handler(error):
    return {
      error: error
    }

