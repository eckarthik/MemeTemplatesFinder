from django.http import HttpResponse, JsonResponse
from .models import Templates
from .serializers import TemplateSerializer, UserSerializer
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth import authenticate


def index(request):
    return HttpResponse("<h1>Hello World</h1>")


def search_templates(request):
    search = request.GET.get("search")
    if request.GET.get("start"):
        start = int(request.GET.get("start"))
    else:
        start = 0
    if request.GET.get("end"):
        end = int(request.GET.get("end"))
    elif request.GET.get("start") and not request.GET.get("end"):
        end = 999
    else:
        end = 10
    rows = Templates.objects.filter(caption__icontains=search)
    serializer = TemplateSerializer(rows, many=True)
    filtered_data = {}
    for template in serializer.data:
        if template['post_shortcode'] not in filtered_data.keys():
            filtered_data[template['post_shortcode']] = []
            filtered_data[template['post_shortcode']].append(template)
        else:
            filtered_data[template['post_shortcode']].append(template)
    number_of_records = len(filtered_data)
    filtered_data = dict(list(filtered_data.items())[start:end])
    api_response = dict()
    api_response['templates'] = filtered_data
    api_response["number_of_records"] = number_of_records
    return JsonResponse(filtered_data, safe=False)


def search_templates_by_hashtag(request):
    movie = request.GET.get("movie")
    if request.GET.get("start"):
        start = int(request.GET.get("start"))
    else:
        start = 0
    if request.GET.get("end"):
        end = int(request.GET.get("end"))
    else:
        end = 10
    rows = Templates.objects.filter(hashtag__icontains=movie)
    serializer = TemplateSerializer(rows, many=True)
    filtered_data = {}
    for template in serializer.data:
        # image_data = "data:image/png;base64,"+base64.b64encode(requests.get(template['display_url']).content).decode('utf-8')
        # template['image_b64'] = image_data
        if template['post_shortcode'] not in filtered_data.keys():
            filtered_data[template['post_shortcode']] = []
            filtered_data[template['post_shortcode']].append(template)
        else:
            filtered_data[template['post_shortcode']].append(template)
    number_of_records = len(filtered_data)
    filtered_data = dict(list(filtered_data.items())[start:end])
    api_response = dict()
    api_response['templates'] = filtered_data
    api_response["number_of_records"] = number_of_records
    return JsonResponse(api_response, safe=False)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_random_templates(request):
    rows = Templates.objects.filter()[60:75]
    serializer = TemplateSerializer(rows, many=True)
    filtered_data = {}
    for template in serializer.data:
        # image_data = "data:image/png;base64,"+base64.b64encode(requests.get(template['display_url']).content).decode('utf-8')
        # template['image_b64'] = image_data
        if template['post_shortcode'] not in filtered_data.keys():
            filtered_data[template['post_shortcode']] = []
            filtered_data[template['post_shortcode']].append(template)
        else:
            filtered_data[template['post_shortcode']].append(template)
    number_of_records = len(filtered_data)
    filtered_data = dict(list(filtered_data.items()))
    api_response = dict()
    api_response['templates'] = filtered_data
    api_response["number_of_records"] = number_of_records
    return JsonResponse(api_response, safe=False)


@api_view(['POST'])
def create_user(request):
    if not request.data:
        return Response({"error": "Required data not passed"}, status=status.HTTP_400_BAD_REQUEST)
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        # All Validations passed
        user = serializer.create(serializer.validated_data)
        user.save()
        token = Token.objects.create(user=user)
        if token:
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login_user(request):
    if not request.data:
        return Response({"error": "Required data not passed"}, status=status.HTTP_400_BAD_REQUEST)
    user = authenticate(username=request.data['username'], password=request.data['password'])
    if user:
        # Credentials are correct
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name
        })
    else:
        return Response({"error": "Invalid username or password"}, status=status.HTTP_403_FORBIDDEN)
